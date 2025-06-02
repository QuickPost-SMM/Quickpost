import SocialPosts from '@/components/SocialPosts';
import NavBar from '@/layouts/NavBar';

export default function YouTubeVideos() {

    return (
        <NavBar title={'Posts'}>
            <div className="">
                <SocialPosts />
            </div>
        </NavBar>
    );
}
