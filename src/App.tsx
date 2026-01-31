
import ScrollStack, { ScrollStackItem } from './components/ScrollStack';
import LiquidEther from './components/LiquidEther';

function App() {
  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden font-sans relative">
      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          autoIntensity={1.5}
        />
      </div>
      <div className="relative z-10 w-full h-full">
        <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center bg-transparent pointer-events-none mix-blend-difference text-white">
          <h1 className="text-2xl font-bold tracking-tighter">Resumind</h1>
          <button className="bg-white text-black px-6 py-2 rounded-full font-medium pointer-events-auto hover:bg-neutral-200 transition-colors">
            Get Started
          </button>
        </nav>

        <ScrollStack
          itemDistance={50}
          itemScale={0}
          rotationAmount={0}
          stackPosition="25%"
          className="bg-transparent"
        >
          <ScrollStackItem itemClassName="w-[95%] md:w-[85%] mx-auto aspect-video bg-[#1a1a1a]/80 backdrop-blur-md border border-neutral-800 text-white !h-auto">
            <div className="h-full flex flex-col justify-between p-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Feature One</h2>
                <p className="text-neutral-400 text-lg">
                  Explore the possibilities with our advanced features designed for professionals.
                </p>
              </div>
              <div className="text-8xl font-black text-neutral-800 text-right opacity-20">01</div>
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="w-[95%] md:w-[85%] mx-auto aspect-video bg-[#222222]/80 backdrop-blur-md border border-neutral-800 text-white !h-auto">
            <div className="h-full flex flex-col justify-between p-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Feature Two</h2>
                <p className="text-neutral-400 text-lg">
                  Seamless integration with your existing workflow, maximizing efficiency.
                </p>
              </div>
              <div className="text-8xl font-black text-neutral-800 text-right opacity-20">02</div>
            </div>
          </ScrollStackItem>

          <ScrollStackItem itemClassName="w-[95%] md:w-[85%] mx-auto aspect-video bg-[#2a2a2a]/80 backdrop-blur-md border border-neutral-800 text-white !h-auto">
            <div className="h-full flex flex-col justify-between p-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Feature Three</h2>
                <p className="text-neutral-400 text-lg">
                  Built for scale and performance, ensuring reliability at every step.
                </p>
              </div>
              <div className="text-8xl font-black text-neutral-800 text-right opacity-20">03</div>
            </div>
          </ScrollStackItem>
        </ScrollStack>
      </div>
    </div>
  );
}

export default App;
