import { Button } from "@/components/ui/button";
import AdminLayout from "./layout/AdminLayout"
import { Head, router, usePage } from '@inertiajs/react'

export default () => {
    const { supports } = usePage().props;

    const goToPage = (url) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    function deleteSupport(id) {
        router.delete(`/admin/support/${id}`);
    }
    return (
        <>
            <Head>
                <title>Manage Support Tickets</title>
            </Head>
            <AdminLayout title="Manage Support Tickets">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {supports.data.map((support: any) => (
                                <tr key={support.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{support.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{support.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{support.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{support.message}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button variant="destructive" onClick={() => deleteSupport(support.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex gap-2 flex-wrap mt-5">
                        {supports.links.map((link, index) => (
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