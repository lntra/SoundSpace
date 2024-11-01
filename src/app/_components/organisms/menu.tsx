import Link from "next/link";

const Menu = () => {
  return (
    <>
      <div className="flex flex-row">
        <Link href="/community" prefetch={false}>
          <div className="flex flex-wrap">
            <p>Comunidades</p>
          </div>
        </Link>
        <div className="flex flex-wrap">
          <p>Notificações</p>
        </div>
        <Link href="/home" prefetch={false}>
          <div className="flex flex-wrap">
            <p>Página Inicial</p>
          </div>
        </Link>
        <Link href="/home" prefetch={false}>
          <div className="flex flex-wrap">
            <p>Perfil</p>
          </div>
        </Link>
        <Link href="/home" prefetch={false}>
          <div className="flex flex-wrap">
            <p>Suporte</p>
          </div>
        </Link>
        <Link href="/login" prefetch={false}>
          <div className="flex flex-wrap">
            <p>Desconectar</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Menu;
