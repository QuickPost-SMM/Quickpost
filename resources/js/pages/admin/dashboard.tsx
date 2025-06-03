import AnalyticsCard from "@/components/AnalyticsCard"
import AdminLayout from "./layout/AdminLayout"
import { Head } from '@inertiajs/react'

export default ({ totalUsers, totalAdmins, totalSubscriptions, totalSupportRequests }) => {
    return (
        <>
            <Head>
                <title>Admin Dashboard</title>
            </Head>
            <AdminLayout title="Admin Dashboard">
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <AnalyticsCard title="Total Users" icon="User" value={totalUsers} />
                    <AnalyticsCard title="Total Admins" icon="User" value={totalAdmins} />
                    <AnalyticsCard title="Total Subscriptions" icon="DollarSign" value={totalSubscriptions} />
                    <AnalyticsCard title="Total Support Requests" icon="DollarSign" value={totalSupportRequests} />
                </div>
            </AdminLayout>
        </>
    )
}