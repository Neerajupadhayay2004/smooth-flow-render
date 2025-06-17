
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Plus, Minus, RotateCcw } from "lucide-react";
import { useState } from "react";

const Stocks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const stockData = [
    { id: "1", name: "iPhone 14 Pro", sku: "IPH14P-001", category: "Electronics", currentStock: 25, minStock: 10, maxStock: 100, location: "A1-B2", lastUpdated: "2024-01-15", status: "In Stock" },
    { id: "2", name: "Samsung Galaxy S23", sku: "SAM23-002", category: "Electronics", currentStock: 5, minStock: 10, maxStock: 80, location: "A1-B3", lastUpdated: "2024-01-14", status: "Low Stock" },
    { id: "3", name: "MacBook Pro M2", sku: "MBP22-003", category: "Electronics", currentStock: 0, minStock: 5, maxStock: 50, location: "A2-C1", lastUpdated: "2024-01-13", status: "Out of Stock" },
    { id: "4", name: "Nike Air Max", sku: "NIK001-004", category: "Footwear", currentStock: 45, minStock: 20, maxStock: 200, location: "B1-A1", lastUpdated: "2024-01-15", status: "In Stock" },
    { id: "5", name: "Dell Monitor 27\"", sku: "DEL27-005", category: "Electronics", currentStock: 15, minStock: 10, maxStock: 60, location: "A3-D2", lastUpdated: "2024-01-12", status: "In Stock" }
  ];

  const stockMovements = [
    { id: "1", product: "iPhone 14 Pro", type: "Sale", quantity: -2, date: "2024-01-15 10:30", reference: "ORD-001" },
    { id: "2", product: "Samsung Galaxy S23", type: "Purchase", quantity: +10, date: "2024-01-14 14:20", reference: "PO-123" },
    { id: "3", product: "MacBook Pro M2", type: "Sale", quantity: -1, date: "2024-01-13 16:45", reference: "ORD-002" },
    { id: "4", product: "Nike Air Max", type: "Return", quantity: +3, date: "2024-01-12 09:15", reference: "RET-001" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-green-100 text-green-800">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-100 text-yellow-800">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-100 text-red-800">Out of Stock</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredData = stockData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Stock Management" />
        
        <div className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stock Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">23</p>
                  <p className="text-sm text-muted-foreground">In Stock</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">5</p>
                  <p className="text-sm text-muted-foreground">Low Stock</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">3</p>
                  <p className="text-sm text-muted-foreground">Out of Stock</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">$125,430</p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stock Management Table */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Current Stock Levels</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>SKU</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Min/Max</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sku}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="font-medium">{item.currentStock}</TableCell>
                        <TableCell>{item.minStock}/{item.maxStock}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Plus className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Minus className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Stock Movements */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Recent Stock Movements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockMovements.map((movement) => (
                  <div key={movement.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                    <div>
                      <p className="font-medium">{movement.product}</p>
                      <p className="text-sm text-muted-foreground">{movement.type} - {movement.reference}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">{movement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stocks;
