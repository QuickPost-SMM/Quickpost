import { Dialog } from '@headlessui/react';
import { usePage } from '@inertiajs/react';
import { XIcon } from 'lucide-react';

const socialMediaPlatforms = [
    {
        id: 'youtube',
        name: 'YouTube',
        icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            </div>
        ),
        description: 'Channel',
        authUrl: '/api/oauth/youtube/redirect',
    },
    {
        id: 'facebook',
        name: 'Facebook',
        icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                </svg>
            </div>
        ),
        description: 'Page or Group',
        authUrl: '/oauth/facebook/redirect',
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-700 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
                    <path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm0-2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.25a1.25 1.25 0 0 1-2.5 0 1.25 1.25 0 0 1 2.5 0zM12 4c-2.474 0-2.878.007-4.029.058-.784.037-1.31.142-1.798.332-.434.168-.747.369-1.08.703a2.89 2.89 0 0 0-.704 1.08c-.19.49-.295 1.015-.331 1.798C4.006 9.075 4 9.461 4 12c0 2.474.007 2.878.058 4.029.037.783.142 1.31.331 1.797.17.435.37.748.702 1.08.337.336.65.537 1.08.703.494.191 1.02.297 1.8.333C9.075 19.994 9.461 20 12 20c2.474 0 2.878-.007 4.029-.058.782-.037 1.309-.142 1.797-.331.433-.169.748-.37 1.08-.702.337-.337.538-.65.704-1.08.19-.493.296-1.02.332-1.8.052-1.104.058-1.49.058-4.029 0-2.474-.007-2.878-.058-4.029-.037-.782-.142-1.31-.332-1.798a2.911 2.911 0 0 0-.703-1.08 2.884 2.884 0 0 0-1.08-.704c-.49-.19-1.016-.295-1.798-.331C14.925 4.006 14.539 4 12 4zm0-2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2z" />
                </svg>
            </div>
        ),
        description: 'Business, Creator, or Personal',
        authUrl: '/oauth/instagram/redirect',
    },
    //   {
    //     id: "linkedin",
    //     name: "LinkedIn",
    //     icon: (
    //       <div className="w-12 h-12 flex items-center justify-center bg-blue-700 text-white rounded-lg">
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    //           <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
    //         </svg>
    //       </div>
    //     ),
    //     description: "Page or Profile",
    //   },
    //   {
    //     id: "threads",
    //     name: "Threads",
    //     icon: (
    //       <div className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-lg">
    //         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
    //           <path d="M18.705 10.4a4.32 4.32 0 0 0-1.198-2.857 4.12 4.12 0 0 0-2.707-1.23 4.37 4.37 0 0 0-1.12.025l.19.654c.276-.034.554-.04.83-.017a3.47 3.47 0 0 1 2.307 1.025 3.72 3.72 0 0 1 1.028 2.455c.02 1.158-.387 2.311-1.171 3.305a7.664 7.664 0 0 1-2.954 2.235c-1.258.575-2.628.85-4.005.8a7.903 7.903 0 0 1-3.99-.8 7.664 7.664 0 0 1-2.954-2.235c-.784-.994-1.19-2.147-1.171-3.305a3.72 3.72 0 0 1 1.028-2.455 3.47 3.47 0 0 1 2.307-1.025c.276-.023.554-.017.83.017l.19-.654a4.37 4.37 0 0 0-1.12-.025 4.12 4.12 0 0 0-2.707 1.23 4.32 4.32 0 0 0-1.198 2.857c-.023 1.398.456 2.793 1.369 3.997a8.27 8.27 0 0 0 3.22 2.435 8.56 8.56 0 0 0 4.33.868c1.49-.046 2.94-.36 4.33-.868a8.27 8.27 0 0 0 3.22-2.435c.913-1.204 1.392-2.599 1.369-3.997z" />
    //           <path d="M12.88 5.03a3.757 3.757 0 0 0-1.336.511 3.59 3.59 0 0 0-1.08 1.016 3.389 3.389 0 0 0-.605 1.348 3.3 3.3 0 0 0 .605 2.6 3.59 3.59 0 0 0 1.08 1.016c.416.25.865.416 1.336.491v-.654a2.754 2.754 0 0 1-.983-.36 2.98 2.98 0 0 1-.899-.845 2.7 2.7 0 0 1-.502-1.07 2.728 2.728 0 0 1 .502-2.152 2.98 2.98 0 0 1 .899-.845 2.754 2.754 0 0 1 .983-.36v-.696zm-1.76 0v.696c-.35.08-.683.22-.983.36a2.98 2.98 0 0 0-.899.845 2.728 2.728 0 0 0-.502 2.152c.08.376.25.73.502 1.07.246.34.55.628.899.845.3.14.633.28.983.36v.654a3.757 3.757 0 0 1-1.336-.491 3.59 3.59 0 0 1-1.08-1.016 3.3 3.3 0 0 1-.605-2.6c.08-.473.3-.913.605-1.348a3.59 3.59 0 0 1 1.08-1.016c.416-.25.865-.416 1.336-.511z" />
    //         </svg>
    //       </div>
    //     ),
    //     description: "Profile",
    //     isNew: true,
    //   },

    {
        id: 'twitter',
        name: 'Twitter',
        icon: (
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-black text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" fill="currentColor" className="h-7 w-7">
                    <path d="M715 522L1145 0H1040L660 460 355 0H0L460 667 0 1227H105L515 737 845 1227H1200L715 522Z" />
                </svg>
            </div>
        ),
        description: 'Account',
        authUrl: '/api/twitter/redirect',
    },
];

export default function ConnectChannelModal({ isOpen, onClose }) {
    const router = usePage();

    const handlePlatformSelect = (platform) => {
        onClose();
        window.location.href = platform.authUrl;
    };
    return (
        <Dialog open={isOpen || false} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="mx-auto w-full max-w-3xl rounded-lg bg-white shadow-xl">
                    <div className="relative p-6">
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                            <XIcon className="h-5 w-5" />
                        </button>

                        <Dialog.Title className="mb-8 text-center text-xl font-medium">Connect a New Channel</Dialog.Title>

                        <div className="grid grid-cols-3 gap-4">
                            {socialMediaPlatforms.map((platform) => (
                                <div
                                    onClick={() => handlePlatformSelect(platform)}
                                    key={platform.id}
                                    className="relative flex cursor-pointer flex-col items-center rounded-lg border border-gray-200 p-6 transition-colors hover:border-blue-500"
                                >
                                    {platform.isNew && (
                                        <span className="absolute top-2 right-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                                            New
                                        </span>
                                    )}
                                    {platform.icon}
                                    <h3 className="mt-4 mb-1 font-medium">{platform.name}</h3>
                                    <p className="text-center text-sm text-gray-500">{platform.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
