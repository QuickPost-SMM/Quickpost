import AdminLayout from "./layout/AdminLayout"
import { Head, router } from '@inertiajs/react'

export default () => {
    function handleSubmit(e) {
        e.preventDefault();

        router.post('/admin/create', {
            name: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value,
        });
    }

    return (
        <>
            <Head>
                <title>Create Admin User</title>
            </Head>
            <AdminLayout title="Create Admin User">
                <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Create Admin
                    </button>
                </form>
            </AdminLayout>
        </>
    )
}