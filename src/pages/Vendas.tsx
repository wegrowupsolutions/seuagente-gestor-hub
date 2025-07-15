import { useState } from "react";
import { Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockVendas = [
  {
    id: 1,
    nomeCliente: "Ana Costa",
    empresa: "Estética & Cia",
    dataFechamento: "2025-07-14",
    valorVenda: 1500.00,
    valorMensalidade: 200.00,
    statusContrato: "Ativo"
  },
  {
    id: 2,
    nomeCliente: "João da Silva",
    empresa: "Barbearia Silva",
    dataFechamento: "2025-07-10",
    valorVenda: 1200.00,
    valorMensalidade: 150.00,
    statusContrato: "Ativo"
  },
  {
    id: 3,
    nomeCliente: "Maria Souza",
    empresa: "Clínica Sorria Mais",
    dataFechamento: "2025-06-28",
    valorVenda: 2000.00,
    valorMensalidade: 300.00,
    statusContrato: "Cancelado"
  }
];

export default function Vendas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [periodoFilter, setPeriodoFilter] = useState("Últimos 30 dias");
  const { toast } = useToast();

  const filteredVendas = mockVendas.filter(venda => {
    return venda.nomeCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
           venda.empresa.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const downloadReport = () => {
    toast({
      title: "Relatório gerado!",
      description: "O arquivo será baixado em instantes.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Minhas Vendas</h1>
        <p className="text-muted-foreground">Clientes que fecharam negócio</p>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Buscar por nome do cliente ou empresa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={periodoFilter} onValueChange={setPeriodoFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrar por Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Últimos 30 dias">Últimos 30 dias</SelectItem>
                <SelectItem value="Mês Atual">Mês Atual</SelectItem>
                <SelectItem value="Mês Anterior">Mês Anterior</SelectItem>
                <SelectItem value="Últimos 6 meses">Últimos 6 meses</SelectItem>
                <SelectItem value="Ano Atual">Ano Atual</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={downloadReport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Baixar Relatório
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendas Table */}
      {filteredVendas.length > 0 ? (
        <Card className="bg-gradient-card shadow-card">
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Nome do Cliente</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Empresa</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Data do Fechamento</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Valor da Venda</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Valor da Mensalidade</th>
                    <th className="text-left p-3 text-sm font-medium text-muted-foreground">Status do Contrato</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVendas.map((venda) => (
                    <tr key={venda.id} className="border-b border-border/50">
                      <td className="p-3 text-sm font-medium text-foreground">{venda.nomeCliente}</td>
                      <td className="p-3 text-sm text-muted-foreground">{venda.empresa}</td>
                      <td className="p-3 text-sm text-muted-foreground">
                        {new Date(venda.dataFechamento).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="p-3 text-sm text-foreground font-medium">
                        R$ {venda.valorVenda.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3 text-sm text-foreground font-medium">
                        R$ {venda.valorMensalidade.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="p-3">
                        <Badge variant={venda.statusContrato === "Ativo" ? "success" : "destructive"}>
                          {venda.statusContrato}
                        </Badge>
                      </td>
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
              <p className="text-muted-foreground">
                Nenhuma venda fechada ainda. Continue prospectando!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}