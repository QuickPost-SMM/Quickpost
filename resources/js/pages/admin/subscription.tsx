import { Button } from "@/components/ui/button";
import AdminLayout from "./layout/AdminLayout"
import { Head, router, usePage } from '@inertiajs/react'

export default () => {
    const { subscriptions } = usePage().props;

    const goToPage = (url: string) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    function deleteSubscription(id) {
        router.delete(`/admin/subscription/${id}`);
    }

    return (
        <>
            <Head>
                <title>Manage Subscriptions</title>
            </Head>
            <AdminLayout title="Manage Subscriptions">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {subscriptions.data.map((subscription: any) => (
                                <tr key={subscription.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{subscription.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subscription.user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subscription.user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subscription.plan_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{subscription.amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button variant="destructive" onClick={() => deleteSubscription(subscription.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex gap-2 flex-wrap mt-5">
                        {subscriptions.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(link.url)}
                                disabled={!link.url}
                                className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                </div>
            </AdminLayout>
        </>
    )
}