import { useState } from "react";
import { Search, Download, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockLeads = [
  {
    id: 1,
    nome: "João da Silva",
    empresa: "Barbearia Silva",
    dataIndicacao: "2025-07-15",
    status: "Qualificado",
    proximoPasso: "Aguardando reunião com SDR"
  },
  {
    id: 2,
    nome: "Maria Santos",
    empresa: "Salão Beleza Total",
    dataIndicacao: "2025-07-14",
    status: "Agendado",
    proximoPasso: "Reunião marcada para amanhã"
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    empresa: "Clínica Dent Care",
    dataIndicacao: "2025-07-13",
    status: "Em Negociação",
    proximoPasso: "Proposta enviada"
  },
  {
    id: 4,
    nome: "Ana Costa",
    empresa: "Estética & Cia",
    dataIndicacao: "2025-07-12",
    status: "Fechado",
    proximoPasso: "Contrato assinado"
  },
  {
    id: 5,
    nome: "Carlos Mendes",
    empresa: "Academia Força Total",
    dataIndicacao: "2025-07-11",
    status: "Perdido",
    proximoPasso: "Não teve interesse"
  }
];

const getStatusVariant = (status: string) => {
  switch (status) {
    case "Qualificado":
      return "qualified";
    case "Agendado":
      return "scheduled";
    case "Em Negociação":
      return "negotiating";
    case "Fechado":
      return "closed";
    case "Perdido":
      return "lost";
    default:
      return "secondary";
  }
};

export default function Leads() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const { toast } = useToast();

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "Todos" || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadReport = () => {
    toast({
      title: "Relatório gerado!",
      description: "O arquivo será baixado em instantes.",
    });
  };

  const copyReferralLink = () => {
    const link = "https://seuagente.ai/parceria?ref=GS123456";
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copiado!",
      description: "O link foi copiado para a área de transferência.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meus Leads</h1>
        <p className="text-muted-foreground">Gerencie seus clientes potenciais</p>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou e-mail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Qualificado">Qualificado</SelectItem>
                <SelectItem value="Agendado">Agendado</SelectItem>
                <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                <SelectItem value="Fechado">Fechado</SelectItem>
                <SelectItem value="Perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={downloadReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Baixar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Leads Table */}
      {filteredLeads.length > 0 ? (
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Nome do Lead</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Empresa</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Data da Indicação</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status Atual</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Próximo Passo</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b border-border/50">
                      <td className="p-3 text-sm font-medium text-foreground">{lead.nome}</td>
                      <td className="p-3 text-sm text-muted-foreground">{lead.empresa}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(lead.dataIndicacao).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3">
                        <Badge variant={getStatusVariant(lead.status)}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">{lead.proximoPasso}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nenhum lead encontrado. Compartilhe seu link de indicação para começar!
              </p>
              <Button onClick={copyReferralLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copiar Link
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}