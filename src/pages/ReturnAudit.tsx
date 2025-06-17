
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Download, RotateCcw, CheckCircle, XCircle, Clock, AlertTriangle, Package, Eye } from "lucide-react";
import { useState } from "react";

const ReturnAudit = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("returns");

  const returnData = [
    { 
      id: "RET-001", 
      orderId: "ORD-1001", 
      product: "iPhone 14 Pro", 
      customer: "John Doe", 
      reason: "Defective Screen", 
      status: "Pending", 
      returnDate: "2024-01-15", 
      refundAmount: "$1,299", 
      condition: "Damaged",
      approvedBy: "N/A"
    },
    { 
      id: "RET-002", 
      orderId: "ORD-1002", 
      product: "Samsung Galaxy S23", 
      customer: "Jane Smith", 
      reason: "Wrong Size", 
      status: "Approved", 
      returnDate: "2024-01-14", 
      refundAmount: "$899", 
      condition: "Good",
      approvedBy: "Admin"
    },
    { 
      id: "RET-003", 
      orderId: "ORD-1003", 
      product: "MacBook Pro M2", 
      customer: "Bob Johnson", 
      reason: "Not as Described", 
      status: "Rejected", 
      returnDate: "2024-01-13", 
      refundAmount: "$0", 
      condition: "Used",
      approvedBy: "Manager"
    },
    { 
      id: "RET-004", 
      orderId: "ORD-1004", 
      product: "Dell Monitor 27\"", 
      customer: "Alice Brown", 
      reason: "Dead Pixels", 
      status: "Processing", 
      returnDate: "2024-01-12", 
      refundAmount: "$299", 
      condition: "Defective",
      approvedBy: "N/A"
    }
  ];

  const auditData = [
    {
      id: "AUD-001",
      type: "Stock Count",
      product: "iPhone 14 Pro",
      expectedQty: 50,
      actualQty: 48,
      variance: -2,
      location: "A1-B2",
      auditDate: "2024-01-15",
      auditor: "John Admin",
      status: "Completed",
      notes: "2 units missing - investigating"
    },
    {
      id: "AUD-002",
      type: "Quality Check",
      product: "Samsung Galaxy S23",
      expectedQty: 30,
      actualQty: 30,
      variance: 0,
      location: "A1-B3",
      auditDate: "2024-01-14",
      auditor: "Jane Manager",
      status: "Completed",
      notes: "All units in good condition"
    },
    {
      id: "AUD-003",
      type: "Cycle Count",
      product: "MacBook Pro M2",
      expectedQty: 15,
      actualQty: 16,
      variance: +1,
      location: "A2-C1",
      auditDate: "2024-01-13",
      auditor: "Bob Auditor",
      status: "In Progress",
      notes: "Extra unit found - checking records"
    },
    {
      id: "AUD-004",
      type: "Damage Assessment",
      product: "Dell Monitor 27\"",
      expectedQty: 25,
      actualQty: 23,
      variance: -2,
      location: "A3-D2",
      auditDate: "2024-01-12",
      auditor: "Alice Supervisor",
      status: "Pending Review",
      notes: "2 units damaged during shipping"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
      case "Completed":
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Pending":
      case "Pending Review":
        return <Badge className="bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Rejected":
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />{status}</Badge>;
      case "Processing":
      case "In Progress":
        return <Badge className="bg-blue-100 text-blue-800"><RotateCcw className="w-3 h-3 mr-1" />{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getVarianceBadge = (variance: number) => {
    if (variance > 0) {
      return <Badge className="bg-green-100 text-green-800">+{variance}</Badge>;
    } else if (variance < 0) {
      return <Badge className="bg-red-100 text-red-800">{variance}</Badge>;
    } else {
      return <Badge className="bg-gray-100 text-gray-800">0</Badge>;
    }
  };

  const filteredReturns = returnData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAudits = auditData.filter(item =>
    item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.auditor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Return & Audit Management" />
        
        <div className="flex-1 p-4 md:p-6 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold">24</p>
                    <p className="text-sm text-muted-foreground">Total Returns</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">18</p>
                    <p className="text-sm text-muted-foreground">Approved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Package className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Audits Done</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-8 h-8 text-red-600" />
                  <div>
                    <p className="text-2xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Discrepancies</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Return & Audit Management</CardTitle>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:flex-initial">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search..."
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
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                  <TabsTrigger value="audits">Audits</TabsTrigger>
                </TabsList>
                
                <TabsContent value="returns" className="space-y-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Return ID</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead className="hidden md:table-cell">Customer</TableHead>
                          <TableHead className="hidden lg:table-cell">Reason</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden sm:table-cell">Amount</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReturns.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.orderId}</TableCell>
                            <TableCell>{item.product}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.customer}</TableCell>
                            <TableCell className="hidden lg:table-cell">{item.reason}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                            <TableCell className="hidden sm:table-cell font-medium">{item.refundAmount}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {item.status === "Pending" && (
                                  <>
                                    <Button size="sm" variant="outline">
                                      <CheckCircle className="w-4 h-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <XCircle className="w-4 h-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="audits" className="space-y-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Audit ID</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead className="hidden md:table-cell">Expected</TableHead>
                          <TableHead className="hidden md:table-cell">Actual</TableHead>
                          <TableHead>Variance</TableHead>
                          <TableHead className="hidden lg:table-cell">Auditor</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAudits.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.type}</TableCell>
                            <TableCell>{item.product}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.expectedQty}</TableCell>
                            <TableCell className="hidden md:table-cell">{item.actualQty}</TableCell>
                            <TableCell>{getVarianceBadge(item.variance)}</TableCell>
                            <TableCell className="hidden lg:table-cell">{item.auditor}</TableCell>
                            <TableCell>{getStatusBadge(item.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                {item.status === "Pending Review" && (
                                  <Button size="sm" variant="outline">
                                    <CheckCircle className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReturnAudit;
