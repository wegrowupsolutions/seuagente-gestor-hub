import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockProfile = {
  nomeCompleto: "João Silva",
  email: "joao.silva@email.com",
  telefone: "(11) 98765-4321",
  paymentInfo: {
    tipoConta: "PIX - Chave E-mail",
    chavePix: "joao.silva@email.com",
    nomeTitular: "João Silva",
    cpfTitular: "123.456.789-00"
  }
};

export default function Perfil() {
  const [isEditing, setIsEditing] = useState(false);
  const [telefone, setTelefone] = useState(mockProfile.telefone);
  const [tipoConta, setTipoConta] = useState(mockProfile.paymentInfo.tipoConta);
  const [chavePix, setChavePix] = useState(mockProfile.paymentInfo.chavePix);
  const [nomeTitular, setNomeTitular] = useState(mockProfile.paymentInfo.nomeTitular);
  const [cpfTitular, setCpfTitular] = useState(mockProfile.paymentInfo.cpfTitular);
  const { toast } = useToast();

  const handleEditProfile = () => {
    if (isEditing) {
      // Save changes
      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSavePaymentInfo = () => {
    toast({
      title: "Informações de pagamento salvas!",
      description: "Seus dados foram atualizados com sucesso.",
    });
  };

  const renderPaymentFields = () => {
    if (tipoConta?.includes("PIX")) {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="chavePix">Chave PIX</Label>
            <Input
              id="chavePix"
              value={chavePix}
              onChange={(e) => setChavePix(e.target.value)}
              placeholder="Digite sua chave PIX"
            />
          </div>
        </div>
      );
    } else if (tipoConta === "Conta Corrente" || tipoConta === "Conta Poupança") {
      return (
        <div className="space-y-4">
          <div>
            <Label htmlFor="banco">Banco</Label>
            <Input
              id="banco"
              placeholder="Nome do banco"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agencia">Agência</Label>
              <Input
                id="agencia"
                placeholder="0000"
              />
            </div>
            <div>
              <Label htmlFor="conta">Conta com Dígito</Label>
              <Input
                id="conta"
                placeholder="00000-0"
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground">Gerencie suas informações de cadastro</p>
      </div>

      {/* Personal Information */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="nomeCompleto">Nome Completo</Label>
            <Input
              id="nomeCompleto"
              value={mockProfile.nomeCompleto}
              disabled
              className="bg-muted"
            />
          </div>
          
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={mockProfile.email}
              disabled
              className="bg-muted"
            />
          </div>
          
          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              disabled={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>

          <Button onClick={handleEditProfile} variant="link" className="p-0">
            {isEditing ? "Salvar Alterações" : "Editar Perfil"}
          </Button>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle className="text-xl">Informações de Pagamento (Comissão)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Para receber suas comissões, por favor, preencha seus dados bancários ou chave PIX.
          </p>

          <div>
            <Label htmlFor="tipoConta">Tipo de Conta</Label>
            <Select value={tipoConta} onValueChange={setTipoConta}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de conta" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conta Corrente">Conta Corrente</SelectItem>
                <SelectItem value="Conta Poupança">Conta Poupança</SelectItem>
                <SelectItem value="PIX - Chave CPF">PIX - Chave CPF</SelectItem>
                <SelectItem value="PIX - Chave CNPJ">PIX - Chave CNPJ</SelectItem>
                <SelectItem value="PIX - Chave E-mail">PIX - Chave E-mail</SelectItem>
                <SelectItem value="PIX - Chave Aleatória">PIX - Chave Aleatória</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderPaymentFields()}

          <div>
            <Label htmlFor="nomeTitular">Nome Completo do Titular</Label>
            <Input
              id="nomeTitular"
              value={nomeTitular}
              onChange={(e) => setNomeTitular(e.target.value)}
              placeholder="Nome completo conforme documento"
            />
          </div>

          <div>
            <Label htmlFor="cpfTitular">CPF do Titular</Label>
            <Input
              id="cpfTitular"
              value={cpfTitular}
              onChange={(e) => setCpfTitular(e.target.value)}
              placeholder="000.000.000-00"
            />
          </div>

          <Button onClick={handleSavePaymentInfo} className="w-full">
            Salvar Informações de Pagamento
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}