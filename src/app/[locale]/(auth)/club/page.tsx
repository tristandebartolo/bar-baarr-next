import AuthForm from "@/components/Auth/AuthForm";
// Props
type PageProps = {
  params: Promise<{ locale: string; alias: string[] }>;
};

export default async function Club ({ params }: PageProps){
  const { locale, alias } = await params;
  return (
    <main className="flex min-h-(--main-height) w-full flex-col items-center justify-center">
      <h1 className={`font-cinderela text-one mb-3 text-7xl`}>Club</h1>
      <AuthForm />
    </main>
  );
}
