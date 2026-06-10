"use client";

import { useState } from "react";
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
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function ProductTable() {
  const [productList, setProductList] = useState(mockProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    isFeatured: false,
  });

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      isFeatured: false,
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
      description: product.description || "",
      isFeatured: product.isFeatured || false,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.category || !form.price || !form.stock) return;

    if (editingProduct) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                category: form.category,
                price: Number(form.price),
                stock: Number(form.stock),
                description: form.description,
                isFeatured: form.isFeatured,
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Date.now(),
        name: form.name,
        slug: form.name.toLowerCase().replace(/\s+/g, "-"),
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        description: form.description,
        isFeatured: form.isFeatured,
        image: `https://picsum.photos/seed/${Date.now()}/600/400`,
        images: [`https://picsum.photos/seed/${Date.now()}/600/400`],
      };
      setProductList((prev) => [...prev, newProduct]);
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProductList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const toggleFeatured = (id) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
  };

  const toggleActive = (id) => {
    setProductList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-heading text-2xl text-erode-black">Products</h2>
        <Button
          onClick={openAdd}
          className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold gap-2"
        >
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Featured</TableHead>
              <TableHead>Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                </TableCell>
                <TableCell className="font-medium text-erode-black">
                  {product.name}
                </TableCell>
                <TableCell className="text-gray-500">{product.category}</TableCell>
                <TableCell>₹{product.price.toLocaleString("en-IN")}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleFeatured(product.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      product.isFeatured
                        ? "bg-erode-green text-erode-black"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {product.isFeatured ? "Yes" : "No"}
                  </button>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => toggleActive(product.id)}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      product.active !== false
                        ? "bg-erode-green text-erode-black"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {product.active !== false ? "Active" : "Inactive"}
                  </button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEdit(product)}
                      className="h-8 w-8"
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
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Product name"
              />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger className="w-full">
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
                />
              </div>
              <div className="space-y-2">
                <Label>Stock</Label>
                <Input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Product description"
                rows={3}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.isFeatured}
                onCheckedChange={(v) =>
                  setForm({ ...form, isFeatured: v === true })
                }
                id="featured"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Featured Product
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-erode-green hover:bg-erode-green/90 text-erode-black font-semibold"
            >
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
