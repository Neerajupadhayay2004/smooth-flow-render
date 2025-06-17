
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, Printer } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from "react";

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const salesData = [
    { id: "ORD-001", customer: "John Doe", items: 3, total: 1299.99, status: "Completed", date: "2024-01-15", payment: "Credit Card" },
    { id: "ORD-002", customer: "Jane Smith", items: 1, total: 899.99, status: "Processing", date: "2024-01-14", payment: "PayPal" },
    { id: "ORD-003", customer: "Bob Johnson", items: 2, total: 459.98, status: "Shipped", date: "2024-01-13", payment: "Bank Transfer" },
    { id: "ORD-004", customer: "Alice Brown", items: 4, total: 1899.96, status: "Completed", date: "2024-01-12", payment: "Credit Card" },
    { id: "ORD-005", customer: "Charlie Wilson", items: 1, total: 199.99, status: "Cancelled", date: "2024-01-11", payment: "Credit Card" }
  ];

  const chartData = [
    { day: 'Mon', sales: 4000 },
    { day: 'Tue', sales: 3000 },
    { day: 'Wed', sales: 2000 },
    { day: 'Thu', sales: 2780 },
    { day: 'Fri', sales: 1890 },
    { day: 'Sat', sales: 2390 },
    { day: 'Sun', sales: 3490 }
  ];

  const topProducts = [
    { name: "iPhone 14 Pro", sold: 45, revenue: "$45,900" },
    { name: "MacBook Pro M2", sold: 23, revenue: "$45,770" },
    { name: "Samsung Galaxy S23", sold: 34, revenue: "$27,200" },
    { name: "Dell Monitor 27\"", sold: 67, revenue: "$20,100" }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "Processing":
        return <Badge className="bg-blue-100 text-blue-800">Processing</Badge>;
      case "Shipped":
        return <Badge className="bg-purple-100 text-purple-800">Shipped</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredData = salesData.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Sales Management" />
        
        <div className="flex-1 p-4 md:p-6 space-y-6">
          {/* Sales Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">$54,321</p>
                  <p className="text-sm text-muted-foreground">Today's Sales</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">892</p>
                  <p className="text-sm text-muted-foreground">Total Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">124</p>
                  <p className="text-sm text-muted-foreground">Pending Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">$1,245</p>
                  <p className="text-sm text-muted-foreground">Avg Order Value</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Chart and Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Weekly Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sold} units sold</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">{product.revenue}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sales Orders Table */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Recent Orders</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search orders..."
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
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.items}</TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{order.payment}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Printer className="w-4 h-4" />
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
        </div>
      </div>
    </div>
  );
};

export default Sales;
