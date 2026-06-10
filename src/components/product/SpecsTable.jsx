"use client";

export default function SpecsTable({ specifications }) {
  if (!specifications || Object.keys(specifications).length === 0) {
    return null;
  }

  const entries = Object.entries(specifications);

  return (
    <div>
      <h2 className="font-heading text-2xl text-erode-black mb-4">
        Specifications
      </h2>
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full">
          <tbody>
            {entries.map(([key, value], index) => (
              <tr
                key={key}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="px-4 py-3 text-sm font-semibold text-erode-black border-r border-gray-200 w-1/3">
                  {key}
                </td>
                <td className="px-4 py-3 text-sm text-erode-black">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
