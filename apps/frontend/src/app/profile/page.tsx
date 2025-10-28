import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Perfil de usuario</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">Email: </span>
              <span>{session.user?.email}</span>
            </div>
            <div className="text-sm">
              <span className="font-medium">ID de usuario: </span>
              <span>{session.user?.id ?? "N/A"}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}