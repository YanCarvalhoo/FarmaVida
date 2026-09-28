import { Link } from "react-router-dom";
import { Package, User, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";

function InfoPage({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
}) {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <span className="w-14 h-14 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-4">
        <Icon size={24} className="text-forest-700" />
      </span>
      <h1 className="font-display text-xl text-ink mb-2">{title}</h1>
      <p className="text-sm text-ink/60 mb-6">{text}</p>
      <Link to="/">
        <Button>Voltar para a loja</Button>
      </Link>
    </div>
  );
}

export function AccountPage() {
  return (
    <InfoPage
      icon={User}
      title="Minha conta"
      text="A área de login e cadastro será conectada ao seu backend. Por enquanto, o fluxo de compra funciona sem conta."
    />
  );
}

export function OrdersPage() {
  return (
    <InfoPage
      icon={Package}
      title="Meus pedidos"
      text="Aqui vão aparecer seus pedidos assim que a integração com o backend estiver ativa."
    />
  );
}
