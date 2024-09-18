import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";

export default function Home() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center py-4 px-12 w-full mt-12 text-white">
            <div className="md:w-1/2 space-y-6">
                <h1 className="text-5xl font-bold mb-4">Welcome to <span className="text-blue-500">StoryPath</span></h1>
                <p className="text-xl mb-6">Create engaging tours, hunts, and adventures!</p>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li>Museum Tours</li>
                    <li>Campus Tours</li>
                    <li>Treasure Hunts</li>
                    <li>And more!</li>
                </ul>
                <Button variant={"outline"} className="text-white">Get Started</Button>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                <CardSpotlight className="w-full max-w-md mx-auto">
                    <Image
                        src="/treasure-hunt.png"
                        alt="Treasure Hunt Illustration"
                        width={400}
                        height={360}
                        layout="responsive"
                        className="rounded-lg"
                    />
                </CardSpotlight>
            </div>
        </div>
    )
}