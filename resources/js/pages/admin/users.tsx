import { Button } from "@/components/ui/button";
import AdminLayout from "./layout/AdminLayout"
import { Head } from '@inertiajs/react'
import { router, usePage } from '@inertiajs/react';

export default () => {
    const { users } = usePage().props;

    const goToPage = (url) => {
        if (url) {
            router.visit(url, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    };

    function deleteUser(userId) {
        router.delete(`/admin/users/${userId}`);
    }


    return (
        <>
            <Head>
                <title>Manage Users</title>
            </Head>
            <AdminLayout title="Manage Users">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.data.map((user: any) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Button variant="destructive" onClick={() => deleteUser(user.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex gap-2 flex-wrap mt-5">
                        {users.links.map((link, index) => (
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