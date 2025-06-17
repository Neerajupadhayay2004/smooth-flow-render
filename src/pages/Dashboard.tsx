
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Dashboard = () => {
  const stats = [
    { title: "Total Products", value: "1,247", change: "+12%", icon: Package, color: "text-blue-600" },
    { title: "Total Sales", value: "$54,321", change: "+18%", icon: DollarSign, color: "text-green-600" },
    { title: "Orders", value: "892", change: "+7%", icon: ShoppingCart, color: "text-purple-600" },
    { title: "Customers", value: "3,456", change: "+23%", icon: Users, color: "text-orange-600" }
  ];

  const salesData = [
    { month: 'Jan', sales: 4000, orders: 240 },
    { month: 'Feb', sales: 3000, orders: 139 },
    { month: 'Mar', sales: 2000, orders: 980 },
    { month: 'Apr', sales: 2780, orders: 390 },
    { month: 'May', sales: 1890, orders: 480 },
    { month: 'Jun', sales: 2390, orders: 380 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 40, color: '#0088FE' },
    { name: 'Clothing', value: 30, color: '#00C49F' },
    { name: 'Books', value: 20, color: '#FFBB28' },
    { name: 'Home', value: 10, color: '#FF8042' }
  ];

  const recentOrders = [
    { id: "ORD-001", customer: "John Doe", amount: "$299", status: "Completed", date: "2024-01-15" },
    { id: "ORD-002", customer: "Jane Smith", amount: "$199", status: "Processing", date: "2024-01-14" },
    { id: "ORD-003", customer: "Bob Johnson", amount: "$149", status: "Shipped", date: "2024-01-13" },
    { id: "ORD-004", customer: "Alice Brown", amount: "$399", status: "Completed", date: "2024-01-12" }
  ];

  const lowStockProducts = [
    { name: "iPhone 14 Pro", stock: 5, category: "Electronics" },
    { name: "Nike Air Max", stock: 3, category: "Footwear" },
    { name: "MacBook Pro", stock: 2, category: "Electronics" },
    { name: "Samsung Galaxy", stock: 4, category: "Electronics" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Dashboard" />
        
        <div className="flex-1 p-4 md:p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="dark:bg-gray-800">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                      <div>
                        <p className="font-medium">{order.id}</p>
                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <p className={`text-sm ${
                          order.status === 'Completed' ? 'text-green-600' :
                          order.status === 'Processing' ? 'text-yellow-600' :
                          'text-blue-600'
                        }`}>{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-red-600 font-medium">{product.stock} units</p>
                        <p className="text-xs text-muted-foreground">Low Stock</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
