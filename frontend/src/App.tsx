import { ChatContainer } from './components/chat/ChatContainer';

function App() {
  return (
    <main className="h-screen w-screen bg-slate-950 flex items-center justify-center overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />
      
      <ChatContainer />
    </main>
  );
}

export default App;
