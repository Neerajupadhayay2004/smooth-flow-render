
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
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header title="Dashboard" />
        
        <div className="flex-1 p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 overflow-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="dark:bg-gray-800">
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{stat.title}</p>
                      <p className="text-lg sm:text-2xl lg:text-3xl font-bold truncate">{stat.value}</p>
                      <p className="text-xs sm:text-sm text-green-600 flex items-center">
                        <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        {stat.change}
                      </p>
                    </div>
                    <stat.icon className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${stat.color} flex-shrink-0`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card className="dark:bg-gray-800">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Sales Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            <Card className="dark:bg-gray-800">
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg dark:border-gray-700">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">{order.id}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{order.customer}</p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-medium text-sm sm:text-base">{order.amount}</p>
                        <p className={`text-xs sm:text-sm ${
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
              <CardHeader className="pb-2 sm:pb-3">
                <CardTitle className="text-base sm:text-lg">Low Stock Alert</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-4">
                  {lowStockProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-2 sm:p-3 border rounded-lg dark:border-gray-700">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">{product.name}</p>
                        <p className="text-xs sm:text-sm text-muted-foreground truncate">{product.category}</p>
                      </div>
                      <div className="text-right ml-2">
                        <p className="text-xs sm:text-sm text-red-600 font-medium">{product.stock} units</p>
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
