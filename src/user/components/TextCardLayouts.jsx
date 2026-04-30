import SparkleIcon from "../../assets/icons/SparkleIcon";
import { FaArrowUp, FaLink } from "react-icons/fa6";
import {
  Globe,
  ImagePlus,
  Code2,
  LayoutDashboard,
  Smartphone,
  Palette,
  Loader,
  Eye,
} from "lucide-react";
import { FiMic } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTask, continueChat } from "../../api/taskApi";
import EditorPanel from "./EditorPanel";
import PDF from "./PDF";
import ZIP from "./ZIP";
import { useSearchParams } from "react-router-dom";
import { getTaskById } from "../../api/taskApi";
import MarkdownRenderer from "./MarkdownRenderer";

const features = [
  {
    id: 1,
    title: "Create Slides",
    desc: "Generate presentation-ready slides",
    icon: LayoutDashboard ,
  },
  {
    id: 2,
    title: "Build Website",
    desc: "Build and deploy complete websites",
    icon: Code2,  
  },
  {
    id: 3,
    title: "Apps Develop",
    desc: "Develop scalable web and mobile apps",
    icon: Smartphone,
  },
  {
    id: 4,
    title: "Design",
    desc: "Create modern UI and illustrations",
    icon: Palette,
  },
];

const TextCardLayouts = () => {
  const textareaRef = useRef(null);
  const scrollRef = useRef(null);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [isWebType, setIsWebType] = useState(false);
  const [searchParams] = useSearchParams();
  const [showEditor, setShowEditor] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const taskIdFromUrl = searchParams.get("taskId");
  const refresh = searchParams.get("refresh");
  useEffect(() => {
    if (refresh) {
      setMessages([]);
      setCurrentTaskId(null);
      setPrompt("");
      setIsWebType(false);
    }
  }, [refresh]);
  useEffect(() => {
    if (!taskIdFromUrl) return;

    const loadTask = async () => {
      try {
        const task = await getTaskById(taskIdFromUrl);

        const taskData = task.data;
        const sId = taskData?.session_id || task?.session_id;
        if (sId) setSessionId(sId);
        const firstAiMsg = task?.messages.find((m) => m.role === "assistant");
        let isWeb = false;
        if (firstAiMsg) {
          try {
            const parsedContent = JSON.parse(firstAiMsg.content);
            const taskType =
              parsedContent?.data?.result?.formatted_results?.[0]?.task_type;
            isWeb = taskType === "web_app" || taskType === "website";
          } catch (e) {
            isWeb = false;
          }
        }
        setIsWebType(isWeb);
        setCurrentTaskId(taskIdFromUrl);

        const history = task?.messages?.map((msg) => {
          if (msg.role === "user") {
            return {
              role: "user",
              text: msg.content,
            };
          } else {
            let outputText = "";
            try {
              const parsed = JSON.parse(msg.content);

              outputText =
                parsed?.data?.response ||
                parsed?.data?.result?.formatted_results?.[0]?.output ||
                parsed?.data?.result?.output ||
                "No content found";
            } catch (e) {
              outputText = msg.content;
            }

            return {
              role: "ai",
              message: "Loaded",
              output: outputText,
              taskId: taskIdFromUrl,
            };
          }
        });

        setMessages(history);
      } catch (err) {
        console.log("Task load failed", err);
      }
    };

    loadTask();
  }, [taskIdFromUrl]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const taskMutation = useMutation({
    mutationFn: (newPrompt) => createTask({ prompt: newPrompt }),
    onSuccess: (res) => {
      const result =
        res?.aiResponse?.data?.result || res?.data?.aiResponse?.data?.result;
      const formatted = result?.formatted_results?.[0];

      setCurrentTaskId(res?.taskId);
      const newSessionId = res?.session_id;
      if (newSessionId) setSessionId(newSessionId);
      setIsWebType(
        formatted?.task_type === "web_app" ||
          formatted?.task_type === "website",
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message: res?.aiResponse?.message || "Generated",
          output: formatted?.output || res?.aiResponse?.data?.result?.output,
          taskId: res?.taskId,
        },
      ]);
      setPrompt("");
    },
    onError: () => alert("Error creating task."),
  });
  const continueMutation = useMutation({
    mutationFn: (data) =>
      continueChat(data.taskId, {
        prompt: data.prompt,
        session_id: data.sessionId,
      }),

    onSuccess: (res) => {
      console.log("CONTINUE RES:", res);

      const data = res?.data?.content?.data;

      const result = data?.response;
     
      const sidFromRes = data?.session_id || res?.data?.session_id;
      if (sidFromRes) {
        setSessionId(sidFromRes);
      }

      setIsWebType(
        data?.task_type === "web_app" || data?.task_type === "website",
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message: res?.data?.content?.message || "Updated",
          output: result || "no result is found",
          taskId: res?.id || currentTaskId,
        },
      ]);

      setPrompt("");
    },

    onError: (err) => {
      console.log("MUTATION ERROR:", err);
      console.log("MUTATION ERROR RESPONSE:", err.response?.data);
      alert(`Failed: ${err.response?.data?.message || err.message}`);
    },
  });

  const handleCreate = () => {
    if (!prompt.trim() || taskMutation.isPending || continueMutation.isPending)
      return;

    setMessages((prev) => [...prev, { role: "user", text: prompt }]);

    if (!currentTaskId) {
      taskMutation.mutate(prompt);
    } else {
      console.log("CONTINUING WITH:", {
        taskId: currentTaskId,
        sessionId,
        prompt,
      });
      continueMutation.mutate({
        taskId: currentTaskId,
        prompt,
        sessionId: sessionId,
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCreate();
    }
  };

  const handleInput = (e) => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    setPrompt(e.target.value);
  };

  // voice chat

  const handleAddLink = () => {
    const url = window.prompt("Enter the link URL:");
    if (url && url.trim() !== "") {
      setPrompt((prev) => `${prev} [Link: ${url}] `);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Your browser does not support voice chat. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt((prev) => (prev.trim() + " " + transcript).trim());
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  if (messages.length > 0) {
    return (
      <div className="flex h-[calc(100vh-12vh)] relative overflow-hidden">
        <div
          className={`flex flex-col pb-4 transition-all duration-500 ${isWebType && showEditor ? "hidden lg:flex w-1/2" : "w-full flex"}`}
        >
          {/* Chat Messages Area */}
          <div
            ref={scrollRef}
            className="flex-1 py-6 xl:px-14 overflow-y-auto space-y-8 scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                {msg.role === "user" ? (
                  <div className="flex gap-4 self-end max-w-[85%]">
                    <div className="bg-gray-100 p-4 rounded-2xl rounded-tl-none text-gray-800 border border-gray-100 shadow-sm">
                      {msg.text}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                      U
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 self-start w-full">
                    <div className="w-8 h-8 flex-shrink-0">
                      <SparkleIcon />
                    </div>
                    <div className="flex-1 space-y-3">
                      {msg.output && (
                        <div>
                          <div className="prose prose-sm break-all leading-tight bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-gray-600">
                            {/* {msg.output}  */}
                            <MarkdownRenderer content={msg.output} />
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {isWebType ? (
                              <ZIP taskId={msg.taskId} />
                            ) : (
                              <PDF
                                taskId={msg.taskId}
                                content={msg.output || msg.message}
                              />
                            )}
                            {isWebType && !showEditor && (
                              <button
                                onClick={() => setShowEditor(true)}
                                className="flex items-center gap-2 mt-3 px-3 py-1.5 bg-blue-400 text-white rounded-lg text-xs hover:bg-gray-800 transition"
                              >
                                <Eye size={14} /> Open Editor
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {(taskMutation.isPending || continueMutation.isPending) && (
              <div className="flex gap-4 animate-pulse">
                <div className="w-8 h-8 flex-shrink-0">
                  <SparkleIcon />
                </div>
                <div className="h-10 bg-gray-100 rounded-xl w-1/2"></div>
              </div>
            )}
          </div>

          {/* Persistent Bottom Input */}

          <div
            className={`shadow-xl   border text-black border-gray-100 rounded-[32px] p-4 sm:p-6  bg-white sm:min-w-xl lg:min-w-2xl ${isWebType && showEditor ? " max-w-4xl" : "mx-auto xl:min-w-4xl "} `}
          >
            <div className="flex items-start gap-4">
              <SparkleIcon />
              <textarea
                ref={textareaRef}
                rows="1"
                value={prompt}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                placeholder="Ask a follow up..."
                className="w-full resize-none focus:outline-none py-2 bg-transparent text-sm max-h-32"
              />
            </div>

            {/* Responsive buttons row */}
            <div className="mt-8 flex flex-col flex-col-reverse md:flex-row items-center justify-between gap-4">
              <div className="flex  items-center justify-center gap-3 w-full md:w-auto">
                <div
                  onClick={handleAddLink}
                  className="sm:p-3 p-1  border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50"
                >
                  <FaLink size={16} />
                </div>
                <button className="flex items-center gap-2 px-4 sm:py-2.5 py-1 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm font-medium text-gray-600">
                  <Globe size={16} />{" "}
                  <span className="whitespace-nowrap">Search web</span>
                </button>
                <button className="flex items-center gap-2 px-4 sm:py-2.5 py-1 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm font-medium text-gray-600">
                  <ImagePlus size={16} />{" "}
                  <span className="whitespace-nowrap">Create Image</span>
                </button>
              </div>

              <div className="flex sm:w-full justify-end  items-center gap-4">
                <div
                  onClick={handleVoiceInput}
                  className={`p-1 sm:p-3 border text-balck border-gray-200 rounded-full cursor-pointer transition-all ${
                    isListening
                      ? "bg-blue-100 border-blue-500  animate-pulse"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FiMic size={16} />
                </div>
                <button
                  onClick={handleCreate}
                  disabled={
                    taskMutation.isPending || continueMutation.isPending
                  }
                  className="p-1 sm:p-2 bg-black text-white rounded-full ml-2 hover:scale-105 transition disabled:opacity-30"
                >
                  <FaArrowUp size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {isWebType && showEditor && (
          <EditorPanel
            messages={messages}
            onClose={() => setShowEditor(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="font-inter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-22">
      {/* <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          How can I assist you today?
        </h1>
      </div> */}
      <div className="px-4 sm:px-6 lg:px-12 xl:px-20">
        <div className="text-center mt-10 sm:mt-12 lg:mt-[60px] font-inter font-semibold">
          <h2 className="text-base sm:text-lg text-gray max-w-md mx-auto">
            Hello, Friend!
          </h2>

          <p
            className="text-gray mt-2 mb-10 sm:mb-12 lg:mb-[60px] 
                   max-w-md sm:max-w-lg lg:max-w-xl 
                   text-xl sm:text-2xl lg:text-[32px] mx-auto"
          >
            How can I assist you today?
          </p>
        </div>
      </div>
      <div className="shadow-2xl border border-gray-100 rounded-[32px] p-4 sm:p-6 mb-12 bg-white max-w-4xl mx-auto">
        <div className="flex items-start gap-4">
          <SparkleIcon />
          <textarea
            ref={textareaRef}
            value={prompt}
            onKeyDown={handleKeyDown}
            onChange={handleInput}
            placeholder="Create in anything...."
            className="text-lg font-normal text-black w-full resize-none focus:outline-none max-h-40 pt-1"
          />
        </div>

        {/* Responsive buttons row */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
            <div
              onClick={handleAddLink}
              className="p-3 border border-gray-200 rounded-full cursor-pointer text-black hover:bg-gray-50"
            >
              <FaLink size={18} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm font-medium text-gray-600">
              <Globe size={16} />{" "}
              <span className="whitespace-nowrap">Search web</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 hover:bg-gray-50 transition text-sm font-medium text-gray-600">
              <ImagePlus size={16} />{" "}
              <span className="whitespace-nowrap">Create Image</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div
              onClick={handleVoiceInput}
              className={`p-1 sm:p-3 border  text-black   border-gray-200 rounded-full cursor-pointer transition-all ${
                isListening
                  ? "bg-blue-100 border-blue-500 animate-pulse"
                  : "hover:bg-gray-50"
              }`}
            >
              <FiMic size={18} />
            </div>
            <button
              onClick={handleCreate}
              disabled={taskMutation.isPending}
              className="p-4 bg-black rounded-full text-white hover:scale-105 active:scale-95 transition disabled:opacity-50"
            >
              {taskMutation.isPending ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <FaArrowUp size={20} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto pb-10">
        {features.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-3xl p-6 bg-white hover:shadow-lg transition cursor-pointer group"
          >
            <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-2xl mb-6 text-black group-hover:bg-black group-hover:text-white transition">
              <item.icon size={24} />
            </div>
            <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TextCardLayouts;

// import SparkleIcon from "../../assets/icons/SparkleIcon";
// import { FaArrowUp, FaLink } from "react-icons/fa6";
// import {
//   Globe,
//   ImagePlus,
//   Code2,
//   LayoutDashboard,
//   Smartphone,
//   Palette,
// } from "lucide-react";
// import { FiMic } from "react-icons/fi";
// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { createTask } from "../../api/taskApi"; // ✅ import
// import { useTask } from "../../context/TaskContext"; // ✅ import context
// import { Loader } from "lucide-react"; // ✅ import loader

// const features = [
//   {
//     id: 1,
//     title: "Create Slides",
//     desc: "Generate presentation-ready slides from your ideas",
//     icon: Code2,
//   },
//   {
//     id: 2,
//     title: "Build Website",
//     desc: "Build and deploy complete websites instantly",
//     icon: LayoutDashboard,
//   },
//   {
//     id: 3,
//     title: "Apps Develop",
//     desc: "Develop scalable web and mobile applications",
//     icon: Smartphone,
//   },
//   {
//     id: 4,
//     title: "Design",
//     desc: "Create modern UI, illustration and graphic designs",
//     icon: Palette,
//   },
// ];

// const TextCardLayouts = () => {
//   const textareaRef = useRef(null);
//   const [prompt, setPrompt] = useState(""); // ✅ state add
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();
//   const { setTasks, setCurrentPrompt, setCurrentTask } = useTask(); // ✅ get context functions

//   const handleInput = (e) => {
//     const el = textareaRef.current;
//     el.style.height = "auto";
//     el.style.height = el.scrollHeight + "px";

//     setPrompt(e.target.value); // ✅ save prompt
//   };

//   const handleClick = async () => {
//     console.log("Prompt hitting from task card layout:", prompt);
//     if (!prompt.trim()) return; // ❌ empty prevent

//     try {
//       console.log("Prompt hitting from try block:", prompt);
//       setLoading(true);
//       console.log("Prompt hitting after loading:", prompt);

//       // ✅ Store prompt immediately
//       setCurrentPrompt(prompt);

//       // ✅ Navigate immediately (don't wait for API response)
//       navigate("/user/newtask/dashboard");

//       // ✅ Call API in background (fire and forget)
//       createTask({
//         prompt: prompt, // ✅ API payload
//       })
//         .then((res) => {
//           console.log("Creating task with prompt:", prompt);
//           console.log("Task created response:", res);

//           // Store the task data when response comes back
//           if (res) {
//             console.log("Response received:", res);
//             console.log("Response taskId:", res.taskId);

//             setTasks((prev) => [res, ...prev]);
//             setCurrentTask(res); // ✅ Store current task for dashboard

//             console.log("Task stored in context successfully");
//           } else {
//             console.warn("No response received:", res);
//           }
//         })
//         .catch((error) => {
//           console.error("Create task error:", error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       console.error("Navigation error:", error);
//       alert("Error: " + (error.message || "Unknown error"));
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="font-inter max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
//       {/* Loading Status */}
//       {loading && (
//         <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-3">
//           <Loader className="text-blue-600 animate-spin" size={20} />
//           <div>
//             <p className="text-blue-900 font-semibold">Creating your task...</p>
//             <p className="text-blue-700 text-sm">
//               This may take 2-3 minutes. Please wait.
//             </p>
//           </div>
//         </div>
//       )}

//       {/* Top Section */}
//       <div className="shadow border border-gray-200 rounded-2xl p-4 sm:p-6 mb-8 bg-white">
//         <div className="flex items-start gap-3">
//           <SparkleIcon />
//           <textarea
//             ref={textareaRef}
//             onChange={handleInput} // ✅ change
//             placeholder="Create in anything...."
//             className="text-base sm:text-lg font-normal text-black w-full resize-none focus:outline-none max-h-40 overflow-y-auto scrollbar-hide"
//           />
//         </div>

//         <div className="mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ">
//           <div className="flex flex-wrap items-center gap-3 sm:gap-4">
//             <div className="size-[38px] sm:size-[42px] border border-gray-400 rounded-full flex items-center justify-center">
//               <FaLink className="text-black text-sm sm:text-base" />
//             </div>

//             <div className="flex flex-wrap items-center gap-3">
//               <button className="flex items-center gap-2 px-4 sm:px-5 h-10 sm:h-11 rounded-full border border-gray-300">
//                 <Globe size={16} className="text-gray-600" />
//                 <span className="text-sm sm:text-[15px] text-gray-700">
//                   Search in web
//                 </span>
//               </button>

//               <button className="flex items-center gap-2 px-4 sm:px-5 h-10 sm:h-11 rounded-full border border-gray-300">
//                 <ImagePlus size={16} className="text-gray-600" />
//                 <span className="text-sm sm:text-[15px] text-gray-700">
//                   Create on Image
//                 </span>
//               </button>
//             </div>
//           </div>

//           {/* Right */}
//           <div className="flex items-center gap-3 sm:gap-4">
//             <div className="size-[38px] sm:size-[42px] border border-gray-400 rounded-full flex items-center justify-center">
//               <FiMic className="text-black text-sm sm:text-base" />
//             </div>

//             <button
//               onClick={handleClick}
//               disabled={loading}
//               className={`size-[38px] sm:size-[42px] bg-black rounded-full flex items-center justify-center ${loading ? "opacity-70 cursor-wait" : "cursor-pointer"}`}
//               title={
//                 loading ? "Processing... This may take 2-3 minutes" : "Create"
//               }
//             >
//               {loading ? (
//                 <Loader className="text-white text-sm sm:text-base animate-spin" />
//               ) : (
//                 <FaArrowUp className="text-white text-sm sm:text-base" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Feature Cards (unchanged) */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 lg:mb-[300px]">
//         {features.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.id}
//               className="border border-gray-200 rounded-2xl p-4 sm:p-5 bg-white hover:shadow-lg transition duration-300"
//             >
//               <div className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full mb-4">
//                 <Icon className="text-gray-600 text-lg" />
//               </div>

//               <h4 className="font-semibold text-base sm:text-lg text-black mb-2">
//                 {item.title}
//               </h4>

//               <p className="text-sm text-gray-500 leading-relaxed">
//                 {item.desc}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default TextCardLayouts;
