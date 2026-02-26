import { AppShell } from "./app/layout/AppShell";
import DashboardPage from "./features/analytics/pages/DashboardPage";

export default function App() {
  return (
    <AppShell>
      <DashboardPage />
    </AppShell>
  );
}