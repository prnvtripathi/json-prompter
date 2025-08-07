import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';
import MaskedDiv from "@/components/ui/masked-div"

export default function Hero() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center py-20">
            <section className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
                <div className="space-y-8 grid grid-cols-1 md:grid-cols-2 items-center justify-items-center">
                    <div>
                        {/* Badge */}
                        <Badge className="group mx-auto w-fit rounded-3xl border-2 border-gray-300 bg-gray-100 dark:bg-gray-800 dark:border-gray-600 px-3 py-1 text-sm text-gray-600 dark:text-gray-300 inline-flex items-center hover:shadow-md transition-all duration-300">
                            Build products for everyone
                            <ArrowRight className="ml-2 h-4 w-4 duration-300 group-hover:translate-x-1" />
                        </Badge>

                        {/* Main heading */}
                        <div className="space-y-4">
                            <h1 className="bg-gradient-to-r from-blue-600 via-red-500 to-pink-600 bg-clip-text text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-transparent leading-tight">
                                Convert your Text Prompts{' '}
                                <br className="hidden md:block" />
                                to <span className='font-mono text-gray-900 dark:text-gray-400'>{`{json}`}</span>.
                            </h1>

                            <p className="max-w-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                                From plain text to perfect prompts - streamline your workflow with structured JSON output.
                            </p>
                        </div>
                    </div>


                    {/* Video section */}
                    <div className="">
                        <ImageDiv />
                    </div>
                </div>
            </section>
        </div>
    );
}

function ImageDiv() {
    return (
        <div className="flex items-center justify-center gap-3 max-w-2xl mx-auto">
            <MaskedDiv maskType="type-1" size={0.4} className="">
                <video
                    className="cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl shadow-2xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '300px', height: '400px', objectFit: 'cover' }}
                >
                    <source
                        src="https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4"
                        type="video/mp4"
                    />
                </video>
            </MaskedDiv>
            <MaskedDiv maskType="type-1" size={0.4} className="rotate-180">
                <video
                    className="cursor-pointer transition-all duration-300 hover:scale-105 rounded-2xl shadow-2xl"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{ width: '300px', height: '400px', objectFit: 'cover' }}
                >
                    <source
                        src="https://videos.pexels.com/video-files/18069803/18069803-uhd_1440_2560_24fps.mp4"
                        type="video/mp4"
                    />
                </video>
            </MaskedDiv>

        </div>
    )
}
