import AppAreaChart from "@/components/Dashboard/HomePageComponents/AppAreaChart";
import AppBarChart from "@/components/Dashboard/HomePageComponents/AppBarChart";
import AppPieChart from "@/components/Dashboard/HomePageComponents/AppPieChart";
import CardList from "@/components/Dashboard/HomePageComponents/PopularArticles";
import TodoList from "@/components/Dashboard/HomePageComponents/TodoList";
import CardsStatsSection from "@/components/Dashboard/HomePageComponents/CardsStatsSection";
import AppLineChart from "@/components/Dashboard/HomePageComponents/AppLineChart";
import LatestBookings from "@/components/Dashboard/HomePageComponents/LatestBookings";
import PopularArticles from "@/components/Dashboard/HomePageComponents/PopularArticles";

export default function DashboardHomePage() {
  return (
    <div className="flex flex-col gap-6">
      <CardsStatsSection />

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div className="bg-card p-6 rounded-2xl shadow-sm">
          <AppLineChart />
        </div>
        <div className="bg-card p-6 rounded-2xl shadow-sm">
          <AppPieChart />
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-sm">
          <LatestBookings />
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-sm">
          <PopularArticles />
        </div>
      </div>
    </div>
  );
}
