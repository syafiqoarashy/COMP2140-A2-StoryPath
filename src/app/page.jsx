import Image from 'next/image';
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col md:flex-row justify-center items-center py-4 px-12 w-full h-full text-white">
            <div className="md:w-1/2 space-y-6">
                <h1 className="text-5xl font-bold mb-4">Welcome to <span className="text-blue-500">StoryPath</span></h1>
                <p className="text-xl mb-6">Create engaging tours, hunts, and adventures!</p>
                <ul className="list-disc list-inside mb-6 space-y-2">
                    <li>Museum Tours</li>
                    <li>Campus Tours</li>
                    <li>Treasure Hunts</li>
                    <li>And more!</li>
                </ul>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
                <CardContainer className="inter-var">
                    <CardBody
                        className="bg-black hover:shadow-2xl hover:shadow-emerald-500/[0.1] border-white/[0.2] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
                    >
                        <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-white"
                        >
                            Discover Adventure with StoryPath
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-300 text-sm max-w-sm mt-2"
                        >
                            Embark on exciting quests and uncover hidden treasures!
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4 h-60 relative">
                            <Image
                                src="/treasure-hunt.png"
                                alt="Treasure Hunt Illustration"
                                layout="fill"
                                objectFit="contain"
                                className="rounded-xl group-hover/card:shadow-xl"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-20">
                            <CardItem
                                translateZ={20}
                                as={Link}
                                href="/projects"
                                className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                            >
                                Explore Projects →
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                as={Link}
                                href="/projects/create"
                                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold"
                            >
                                Create New Project
                            </CardItem>
                        </div>
                    </CardBody>
                </CardContainer>
            </div>
        </div>
    )
}