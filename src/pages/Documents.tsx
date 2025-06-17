
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, FileText, Upload, Eye } from "lucide-react";
import { useState } from "react";

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const documentsData = [
    { id: "DOC-001", name: "Invoice #INV-001", type: "Invoice", customer: "John Doe", date: "2024-01-15", status: "Sent", amount: "$1,299" },
    { id: "DOC-002", name: "Purchase Order #PO-123", type: "Purchase Order", vendor: "Tech Supplier Inc", date: "2024-01-14", status: "Approved", amount: "$5,430" },
    { id: "DOC-003", name: "Delivery Note #DN-456", type: "Delivery Note", customer: "Jane Smith", date: "2024-01-13", status: "Delivered", amount: "$899" },
    { id: "DOC-004", name: "Credit Note #CN-789", type: "Credit Note", customer: "Bob Johnson", date: "2024-01-12", status: "Processed", amount: "$199" },
    { id: "DOC-005", name: "Receipt #REC-321", type: "Receipt", customer: "Alice Brown", date: "2024-01-11", status: "Completed", amount: "$1,899" }
  ];

  const recentTemplates = [
    { name: "Standard Invoice", type: "Invoice", lastUsed: "2024-01-15", uses: 45 },
    { name: "Purchase Order Form", type: "Purchase Order", lastUsed: "2024-01-14", uses: 23 },
    { name: "Delivery Receipt", type: "Delivery Note", lastUsed: "2024-01-13", uses: 67 },
    { name: "Credit Note Template", type: "Credit Note", lastUsed: "2024-01-12", uses: 12 }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Sent":
      case "Delivered":
      case "Completed":
        return <Badge className="bg-green-100 text-green-800">{status}</Badge>;
      case "Approved":
      case "Processed":
        return <Badge className="bg-blue-100 text-blue-800">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">{status}</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-800">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getDocumentIcon = (type: string) => {
    return <FileText className="w-4 h-4" />;
  };

  const filteredData = documentsData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header title="Document Management" />
        
        <div className="flex-1 p-4 md:p-6 space-y-6">
          {/* Document Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">45</p>
                  <p className="text-sm text-muted-foreground">Invoices</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">23</p>
                  <p className="text-sm text-muted-foreground">Purchase Orders</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">67</p>
                  <p className="text-sm text-muted-foreground">Delivery Notes</p>
                </div>
              </CardContent>
            </Card>
            <Card className="dark:bg-gray-800">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">12</p>
                  <p className="text-sm text-muted-foreground">Credit Notes</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="dark:bg-gray-800">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  Create Invoice
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Upload className="w-6 h-6" />
                  Upload Document
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <Download className="w-6 h-6" />
                  Export Reports
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  View Templates
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Documents and Templates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="dark:bg-gray-800">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>Recent Documents</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search documents..."
                          className="pl-10 w-full sm:w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Document</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Party</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {getDocumentIcon(doc.type)}
                                <span className="font-medium">{doc.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.customer || doc.vendor}</TableCell>
                            <TableCell>{doc.amount}</TableCell>
                            <TableCell>{doc.date}</TableCell>
                            <TableCell>{getStatusBadge(doc.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                <Button size="sm" variant="outline">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Download className="w-4 h-4" />
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

            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Document Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTemplates.map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <div>
                          <p className="font-medium text-sm">{template.name}</p>
                          <p className="text-xs text-muted-foreground">{template.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Used {template.uses} times</p>
                        <Button size="sm" variant="ghost" className="h-6 px-2">
                          Use
                        </Button>
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

export default Documents;
