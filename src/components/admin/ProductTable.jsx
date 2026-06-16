"use client";

import { useState, useEffect, useCallback } from "react";
import { products as mockProducts, categories } from "@/data/mockData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { handleImageError } from "@/lib/imageFallback";
import { apiUrl } from "@/lib/apiUrl";

export default function ProductTable() {
  const [productList, setProductList] = useState(mockProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    shortDescription: "",
    description: "",
    isFeatured: false,
    image: "",
  });

  const getToken = () => localStorage.getItem("erodeToken");

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(apiUrl("products"), {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success && data.data?.length > 0) {
        setProductList(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      // Keep mock data as fallback
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      shortDescription: "",
      description: "",
      isFeatured: false,
      image: "",
    });
    setEditingProduct(null);
  };

  const openAdd = () => {
    resetForm();
    setDialogOpen(true);
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      isFeatured: product.isFeatured || false,
      image: product.image || "",
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.price || !form.stock) return;

    setSaving(true);
    try {
      const token = getToken();
      const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const productData = {
        name: form.name,
        slug: form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        shortDescription: form.shortDescription,
        description: form.description,
        isFeatured: form.isFeatured,
        image: form.image || `/images/products/placeholder.png`,
        images: form.image ? [form.image] : [],
        specifications: {},
      };

      if (editingProduct) {
        // Update
        try {
          await fetch(apiUrl(`products/${editingProduct.id}`), {
            method: "PUT",
            headers,
            body: JSON.stringify(productData),
          });
        } catch (e) { /* fallback to local */ }

        setProductList((prev) =>
          prev.map((p) =>
            p.id === editingProduct.id
              ? { ...p, ...productData }
              : p
          )
        );
      } else {
        // Create
        let newProduct = { id: Date.now(), ...productData };

        try {
          const res = await fetch(apiUrl("products"), {
            method: "POST",
            headers,
            body: JSON.stringify(productData),
          });
          const data = await res.json();
          if (data.success) {
            newProduct = data.data;
          }
        } catch (e) { /* fallback to local */ }

        setProductList((prev) => [...prev, newProduct]);
      }

      setDialogOpen(false);
      resetForm();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = getToken();
      await fetch(apiUrl(`products/${id}`), {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
    } catch (e) { /* fallback to local */ }

    setProductList((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-heading text-2xl text-erode-black">Products</h2>
          <p className="text-sm text-erode-black/50">{productList.length} products total</p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2 rounded-xl"
        >
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <div className="border border-gray-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-erode-black/40">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  </TableCell>
                </TableRow>
              ) : (
                productList.map((product) => (
                  <TableRow key={product.id} className="hover:bg-gray-50/50">
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-contain bg-gray-50 p-0.5"
                        onError={handleImageError}
                      />
                    </TableCell>
                    <TableCell className="font-medium text-erode-black">
                      {product.name}
                    </TableCell>
                    <TableCell className="text-erode-black/60">{product.category}</TableCell>
                    <TableCell className="font-medium">₹{product.price?.toLocaleString("en-IN")}</TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${product.stock > 5 ? "text-erode-green" : product.stock > 0 ? "text-amber-600" : "text-red-500"}`}>
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        product.isFeatured
                          ? "bg-erode-green/20 text-erode-green"
                          : "bg-gray-100 text-erode-black/40"
                      }`}>
                        {product.isFeatured ? "Featured" : "—"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(product)}
                          className="h-8 w-8 hover:text-erode-green"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., GARE BHIM"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="w-full rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (₹)</Label>
                <Input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="0"
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="0"
                  className="rounded-xl"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/images/products/bhim.png"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input
                value={form.shortDescription}
                onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                placeholder="Brief product description"
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label>Full Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Detailed product description"
                rows={3}
                className="rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.isFeatured}
                onCheckedChange={(v) => setForm({ ...form, isFeatured: v === true })}
                id="featured"
                className="data-[state=checked]:bg-erode-green data-[state=checked]:border-erode-green"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Product
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold rounded-xl"
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
