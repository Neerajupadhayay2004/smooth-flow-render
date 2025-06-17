
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Cell } from 'recharts';

const Reports = () => {
  const salesData = [
    { month: 'Jan', sales: 45000, profit: 12000, orders: 245 },
    { month: 'Feb', sales: 52000, profit: 15000, orders: 289 },
    { month: 'Mar', sales: 48000, profit: 13000, orders: 267 },
    { month: 'Apr', sales: 61000, profit: 18000, orders: 324 },
    { month: 'May', sales: 55000, profit: 16000, orders: 298 },
    { month: 'Jun', sales: 67000, profit: 21000, orders: 356 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, color: '#0088FE' },
    { name: 'Clothing', value: 25, color: '#00C49F' },
    { name: 'Books', value: 15, color: '#FFBB28' },
    { name: 'Home & Garden', value: 10, color: '#FF8042' },
    { name: 'Sports', value: 5, color: '#8884D8' }
  ];

  const reportCategories = [
    {
      title: "Sales Reports",
      icon: BarChart3,
      reports: [
        { name: "Daily Sales Summary", description: "Daily sales performance and trends" },
        { name: "Monthly Sales Report", description: "Comprehensive monthly sales analysis" },
        { name: "Customer Sales Report", description: "Sales breakdown by customer" },
        { name: "Product Performance", description: "Best and worst performing products" }
      ]
    },
    {
      title: "Inventory Reports",
      icon: PieChart,
      reports: [
        { name: "Stock Level Report", description: "Current inventory levels and alerts" },
        { name: "Low Stock Alert", description: "Products requiring restocking" },
        { name: "Inventory Valuation", description: "Total inventory value assessment" },
        { name: "Stock Movement Report", description: "Inventory in/out movements" }
      ]
    },
    {
      title: "Financial Reports",
      icon: TrendingUp,
      reports: [
        { name: "Profit & Loss", description: "Revenue and expense analysis" },
        { name: "Cash Flow Report", description: "Money in and out tracking" },
        { name: "Tax Summary", description: "Tax calculations and summaries" },
        { name: "Cost Analysis", description: "Product cost breakdown" }
      ]
    }
  ];

  const quickStats = [
    { title: "Total Revenue", value: "$348,000", change: "+12.5%", period: "This Year" },
    { title: "Gross Profit", value: "$95,000", change: "+8.3%", period: "This Year" },
    { title: "Total Orders", value: "1,879", change: "+15.2%", period: "This Year" },
    { title: "Avg Order Value", value: "$185", change: "+3.1%", period: "This Year" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Reports & Analytics" />
        
        <div className="flex-1 p-4 md:p-6 space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, index) => (
              <Card key={index} className="dark:bg-gray-800">
                <CardContent className="p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change} {stat.period}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report Filters */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Report Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sales">Sales Report</SelectItem>
                    <SelectItem value="inventory">Inventory Report</SelectItem>
                    <SelectItem value="financial">Financial Report</SelectItem>
                    <SelectItem value="customer">Customer Report</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Sales & Profit Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <RechartsPieChart.Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </RechartsPieChart.Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Report Categories */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {reportCategories.map((category, index) => (
              <Card key={index} className="dark:bg-gray-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <category.icon className="w-5 h-5" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.reports.map((report, reportIndex) => (
                      <div key={reportIndex} className="border rounded-lg p-3 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{report.name}</h4>
                            <p className="text-xs text-muted-foreground">{report.description}</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
