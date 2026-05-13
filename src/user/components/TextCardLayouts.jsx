import SparkleIcon from "../../assets/icons/SparkleIcon";
import { FaArrowUp, FaLink, FaArrowDown } from "react-icons/fa6";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { createTask, continueChat } from "../../api/taskApi";
import { apiGet, getImageUrl } from "../../lib/api";
import { tokenStorage } from "../../lib/tokenStorage";
import EditorPanel from "./EditorPanel";
import PDF from "./PDF";
import ZIP from "./ZIP";
import { getTaskById } from "../../api/taskApi";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import MarkdownRenderer from "./MarkdownRenderer";
import StructuredMessageRenderer from "./StructuredMessageRenderer";


const features = [
  {
    id: 1,
    title: "Create Slides",
    desc: "Generate presentation-ready slides",
    icon: LayoutDashboard,
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
const extractMessageContent = (rawData) => {
  try {
    // OLD FORMAT SUPPORT
    if (typeof rawData === "string") {
      return {
        type: "markdown",
        content: rawData,
      };
    }

    // NEW STRUCTURED RESPONSE
    if (Array.isArray(rawData)) {
      return {
        type: "structured",
        content: rawData,
      };
    }

    return {
      type: "text",
      content: "No content found",
    };
  } catch {
    return {
      type: "text",
      content: "Failed to parse content",
    };
  }
};

const TypewriterText = ({ content, onComplete }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const t = setInterval(() => {
      setDisplayed(content.substring(0, i + 1));
      i += 3;
      if (i >= content.length) {
        setDisplayed(content);
        clearInterval(t);
        if (onComplete) onComplete();
      }
    }, 10);
    return () => clearInterval(t);
  }, [content, onComplete]);
  return <span>{displayed}</span>;
};

const TypewriterMarkdown = ({ content, onComplete }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const t = setInterval(() => {
      setDisplayed(content.substring(0, i + 1));
      i += 5;
      if (i >= content.length) {
        setDisplayed(content);
        clearInterval(t);
        if (onComplete) onComplete();
      }
    }, 10);
    return () => clearInterval(t);
  }, [content, onComplete]);
  return <MarkdownRenderer content={displayed} />;
};

const TypewriterStructured = ({ blocks, onComplete }) => {
  const [visibleBlocks, setVisibleBlocks] = useState([]);
  useEffect(() => {
    if (!blocks || blocks.length === 0) {
      if (onComplete) onComplete();
      return;
    }
    let i = 0;
    setVisibleBlocks([]);
    const t = setInterval(() => {
      setVisibleBlocks(blocks.slice(0, i + 1));
      i++;
      if (i >= blocks.length) {
        clearInterval(t);
        if (onComplete) onComplete();
      }
    }, 300); // Reveal block by block every 300ms
    return () => clearInterval(t);
  }, [blocks, onComplete]);
  return <StructuredMessageRenderer blocks={visibleBlocks} />;
};

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
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkInput, setLinkInput] = useState("");

  const token = tokenStorage.getAccessToken();
  const { data: profileData } = useQuery({
    queryKey: ["profileData"],
    queryFn: async () => {
      const res = await apiGet("/user/profile");
      return res.data;
    },
    enabled: !!token,
  });

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop - clientHeight > 150) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

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
    if (!taskIdFromUrl || taskIdFromUrl === "undefined") return;

    const loadTask = async () => {
      try {
        const task = await getTaskById(taskIdFromUrl);
        console.log("FULL TASK RESPONSE:", task);

        // Support both { data: { ... } } wrapper and direct data
        const taskData = task?.data || task;

        const sId = taskData?.session_id;
        if (sId) setSessionId(sId);

        setCurrentTaskId(taskIdFromUrl);

        // Check if the response has the OLD format (messages array) or NEW format (prompt + aiResponse)
        if (
          taskData?.messages &&
          Array.isArray(taskData.messages) &&
          taskData.messages.length > 0
        ) {
          // ===== OLD FORMAT: messages array =====
          const firstAiMsg = taskData.messages.find(
            (m) => m.role === "assistant",
          );
          const aiResponseData =
            typeof firstAiMsg.content === "string"
              ? JSON.parse(firstAiMsg.content)?.data ||
                JSON.parse(firstAiMsg.content)
              : firstAiMsg.content?.data || firstAiMsg.content;

          let isWeb = false;
          if (aiResponseData) {
            try {
              const taskType =
                aiResponseData?.result?.formatted_results?.[0]?.task_type ||
                aiResponseData?.formatted_results?.[0]?.task_type;

              isWeb =
                taskType === "web_app" ||
                taskType === "website" ||
                taskType === "app" ||
                taskType === "html-css";
            } catch {
              isWeb = false;
            }
          }
          const codebaseFiles = taskData?.codebase?.files || [];
          setIsWebType(isWeb || codebaseFiles.length > 0);

          const history = taskData.messages.map((msg) => {
            if (msg.role === "user") {
              const userText = Array.isArray(msg.content)
                ? msg.content.map((b) => b.text || "").join(" ")
                : typeof msg.content === "string"
                  ? msg.content
                  : "";
              return {
                role: "user",
                text: userText,
              };
            } else {
              let content = msg.content;
              if (typeof content === "string") {
                try {
                  content = JSON.parse(content);
                } catch (e) {
                  console.error("Failed to parse msg.content", e);
                }
              }

              const rawResponse =
                content?.data?.response ||
                content?.data?.structured_response ||
                content?.data?.result?.formatted_results?.[0]?.output ||
                null;

              const rawCodebase =
                content?.codebase?.files ||
                content?.data?.codebase?.files ||
                content?.data?.result?.codebase ||
                content?.data?.codebase ||
                taskData?.codebase?.files ||
                [];

              const normalizedCodebase = Array.isArray(rawCodebase)
                ? rawCodebase
                : rawCodebase?.files || [];

              return {
                role: "ai",
                message: content?.message || "Loaded",
                output: extractMessageContent(rawResponse || msg.content),
                codebase: normalizedCodebase,
                taskId: taskIdFromUrl,
                messageId: msg.id || msg._id,
              };
            }
          });
          setMessages(history ?? []);
        } else {
          // ===== NEW FORMAT: prompt + aiResponse (no messages array) =====
          const formatted =
            taskData?.aiResponse?.data?.result?.formatted_results?.[0];
          const taskType = formatted?.task_type;
          const codebaseFiles =
            taskData?.codebase?.files ||
            taskData?.aiResponse?.data?.result?.codebase ||
            taskData?.aiResponse?.data?.codebase?.files ||
            [];

          const isWeb =
            taskType === "web_app" ||
            taskType === "website" ||
            taskType === "app" ||
            taskType === "html-css" ||
            codebaseFiles.length > 0;

          setIsWebType(isWeb);

          const history = [];

          // Add user message from prompt
          if (taskData?.prompt) {
            history.push({
              role: "user",
              text: taskData.prompt,
            });
          }

          // Add AI response
          if (taskData?.aiResponse) {
            const aiRes =
              typeof taskData.aiResponse === "string"
                ? JSON.parse(taskData.aiResponse)
                : taskData.aiResponse;
            const aiResData = aiRes?.data || aiRes;

            const rawOutput =
              formatted?.summary ||
              formatted?.output ||
              aiResData?.result?.output ||
              aiResData?.response ||
              null;

            const rawCodebase =
              taskData?.codebase?.files ||
              aiResData?.result?.codebase ||
              aiResData?.codebase?.files ||
              [];

            const codebaseFiles = Array.isArray(rawCodebase)
              ? rawCodebase
              : rawCodebase?.files || [];

            history.push({
              role: "ai",
              message: taskData?.aiResponse?.message || "Generated",
              output: extractMessageContent(rawOutput),
              codebase: codebaseFiles,
              taskId: taskIdFromUrl,
              messageId: aiRes?.id || aiRes?._id || taskData?.aiResponse?.id || taskData?.aiResponse?._id,
            });
          }

          setMessages(history);
        }
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
      const taskData = res?.data || res;
      const aiResData = taskData?.aiResponse?.data;
      const result = aiResData?.result || aiResData;
      const formatted = result?.formatted_results?.[0];

      setCurrentTaskId(taskData?.taskId);
      const newSessionId = taskData?.session_id || aiResData?.session_id;
      if (newSessionId) setSessionId(newSessionId);

      const rawCodebase =
        taskData?.codebase?.files ||
        aiResData?.result?.codebase ||
        aiResData?.codebase?.files ||
        [];

      const codebase = Array.isArray(rawCodebase)
        ? rawCodebase
        : rawCodebase?.files || [];

      const isNewWeb =
        formatted?.task_type === "web_app" ||
        formatted?.task_type === "website" ||
        formatted?.task_type === "app" ||
        formatted?.task_type === "html-css" ||
        codebase.length > 0;

      if (isNewWeb) setIsWebType(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message: taskData?.aiResponse?.message || "Generated",
          output: extractMessageContent(
            formatted?.summary ||
              formatted?.output ||
              aiResData?.response ||
              aiResData?.structured_response ||
              result?.output,
          ),
          codebase: codebase,
          taskId: taskData?.taskId,
          messageId: taskData?.aiResponse?.id || taskData?.aiResponse?._id,
          isTyping: true,
        },
      ]);
      setPrompt("");
    },
    onError: () => toast.error("Error creating task."),
  });
  const continueMutation = useMutation({
    mutationFn: (data) =>
      continueChat(data.taskId, {
        prompt: data.prompt,
        session_id: data.sessionId,
      }),

    onSuccess: (res) => {
      console.log("CONTINUE RES:", res);
      const taskData = res?.data || res;
      const aiResData = taskData?.aiResponse?.data;

      const sidFromRes = taskData?.session_id || aiResData?.session_id;
      if (sidFromRes) {
        setSessionId(sidFromRes);
      }

      const taskType =
        taskData?.aiResponse?.data?.result?.formatted_results?.[0]?.task_type;

      const rawCodebase =
        taskData?.codebase?.files ||
        aiResData?.result?.codebase ||
        aiResData?.codebase?.files ||
        [];

      const codebase = Array.isArray(rawCodebase)
        ? rawCodebase
        : rawCodebase?.files || [];

      const isNewWeb =
        taskType === "web_app" ||
        taskType === "website" ||
        taskType === "app" ||
        taskType === "html-css" ||
        codebase.length > 0;

      if (isNewWeb) setIsWebType(true);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          message: taskData?.aiResponse?.message || "Updated",
          output: extractMessageContent(
            aiResData?.result?.formatted_results?.[0]?.summary ||
              aiResData?.result?.formatted_results?.[0]?.output ||
              aiResData?.response ||
              aiResData?.structured_response,
          ),
          codebase: codebase,
          taskId: taskData?.taskId || currentTaskId,
          messageId: taskData?.aiResponse?.id || taskData?.aiResponse?._id,
          isTyping: true,
        },
      ]);

      setPrompt("");
    },

    onError: (err) => {
      console.log("MUTATION ERROR:", err);
      console.log("MUTATION ERROR RESPONSE:", err.response?.data);
      toast.error(`Failed: ${err.response?.data?.message || err.message}`);
    },
  });

  const handleCreate = () => {
    if (!prompt.trim() || taskMutation.isPending || continueMutation.isPending)
      return;
    const currentPrompt = prompt;
    setMessages((prev) => [...prev, { role: "user", text: currentPrompt }]);
    setPrompt("");
    if (!currentTaskId) {
      taskMutation.mutate(currentPrompt);
    } else {
      console.log("CONTINUING WITH:", {
        taskId: currentTaskId,
        sessionId,
        prompt,
      });
      continueMutation.mutate({
        taskId: currentTaskId,
        prompt: currentPrompt,
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
    setIsLinkModalOpen(true);
    setLinkInput("");
  };

  const handleLinkSubmit = () => {
    if (linkInput && linkInput.trim() !== "") {
      setPrompt((prev) => `${prev} [Link: ${linkInput.trim()}] `);
    }
    setIsLinkModalOpen(false);
    setLinkInput("");
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Your browser does not support voice chat. Please use Chrome.");
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
      <div className="flex h-[calc(100vh-7.5vh)] relative overflow-hidden">
        <div
          className={`relative flex flex-col pb-4 transition-all duration-500 ${isWebType && showEditor ? "hidden lg:flex w-1/2" : "w-full flex"}`}
        >
          {/* Chat Messages Area */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex-1 w-full md:max-w-5xl mx-auto py-6 px-4 sm:px-6 overflow-y-auto space-y-8 scroll-smooth"
          >
            {messages.map((msg, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                {msg.role === "user" ? (
                  <div className="flex gap-4 self-end max-w-[90%] sm:max-w-full">
                    <div className=" bg-gray-100 p-4 ml-2 sm:ml-8  rounded-2xl break-all leading-tight rounded-tr-none text-gray-800 border border-gray-200 shadow-sm ">
                      {typeof msg.text === "string"
                        ? msg.text
                        : Array.isArray(msg.text)
                          ? msg.text.map((b) => b.text || "").join(" ")
                          : JSON.stringify(msg.text)}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-200 shadow-sm">
                      {profileData?.avatarUrl ? (
                        <img 
                          src={getImageUrl(profileData.avatarUrl)} 
                          alt="U" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
                          U
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-2 self-start w-full">
                    <div className="w-8 h-8 flex-shrink-0">
                      <SparkleIcon />
                    </div>
                    <div className="flex-1 space-y-3 overflow-y-auto w-full">
                      {msg.output && (
                        <div className="w-full">
                          <div className="prose prose-sm break-all leading-tight bg-blue-50/50 p-4 mr-2 sm:mr-8 rounded-xl  border border-blue-100 text-gray-600">
                            {msg.output?.type === "markdown" ? (
                              <MarkdownRenderer content={msg.output.content} />
                            ) : msg.output?.type === "structured" ? (
                              <StructuredMessageRenderer blocks={msg.output.content} />
                            ) : (
                              <p>{msg.output?.content}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {isWebType ? (
                              <ZIP taskId={msg.taskId} />
                            ) : (
                              <PDF
                                taskId={msg.messageId}
                                content={
                                  typeof msg.output?.content === "string"
                                    ? msg.output.content
                                    : JSON.stringify(
                                        msg.output?.content,
                                        null,
                                        2,
                                      )
                                }
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
              <div className="flex gap-2 self-start w-full">
                <div className="w-8 h-8 flex-shrink-0">
                  <SparkleIcon />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="prose prose-sm bg-blue-50/50 p-4 mr-8 rounded-xl border border-blue-100 text-gray-600 w-24 h-12 flex items-center justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Scroll to Bottom Button */}
          {showScrollButton && (
            <div className="absolute bottom-46 left-1/2 -translate-x-1/2 z-50">
              <button
                onClick={scrollToBottom}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full py-2 px-4 shadow-xl transition-all hover:scale-105 active:scale-95 border border-gray-700 flex items-center justify-center "
              >
                <FaArrowDown size={14} />
                <span className="text-sm font-medium"></span>
              </button>
            </div>
          )}

          {/* Persistent Bottom Input */}

          <div
            className={`shadow-xl w-full max-w-4xl mx-auto border text-black border-gray-100 rounded-[32px] p-4 sm:p-6 mb-4 bg-white`}
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
            <div className="mt-8 flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  onClick={handleAddLink}
                  className="p-3 border border-gray-200 rounded-full cursor-pointer hover:bg-gray-50"
                >
                  <FaLink size={18} />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  onClick={handleVoiceInput}
                  className={`p-3 border text-black border-gray-200 rounded-full cursor-pointer transition-all ${
                    isListening
                      ? "bg-blue-100 border-blue-500 animate-pulse"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <FiMic size={18} />
                </div>
                <button
                  onClick={handleCreate}
                  disabled={
                    taskMutation.isPending || continueMutation.isPending
                  }
                  className="p-3 bg-black text-white rounded-full hover:scale-105 active:scale-95 transition disabled:opacity-30"
                >
                  <FaArrowUp size={18} />
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
        <div className="mt-8 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              onClick={handleAddLink}
              className="p-3 border border-gray-200 rounded-full cursor-pointer text-black hover:bg-gray-50"
            >
              <FaLink size={18} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              onClick={handleVoiceInput}
              className={`p-3 border text-black border-gray-200 rounded-full cursor-pointer transition-all ${
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
              className="p-3 bg-black rounded-full text-white hover:scale-105 active:scale-95 transition disabled:opacity-50"
            >
              {taskMutation.isPending ? (
                <Loader className="animate-spin" size={18} />
              ) : (
                <FaArrowUp size={18} />
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

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-[32px] p-8 w-full max-w-md shadow-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-4 text-black">
              <div className="p-3 bg-gray-50 rounded-2xl">
                <FaLink size={20} />
              </div>
              <h3 className="text-xl font-bold">Add Link</h3>
            </div>

            <p className="text-gray-500 mb-6 text-xs">
              Enter the URL of the link you want to include in your prompt.
            </p>

            <input
              autoFocus
              type="url"
              value={linkInput}
              onChange={(e) => setLinkInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLinkSubmit();
                if (e.key === "Escape") setIsLinkModalOpen(false);
              }}
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/5 text-black mb-8 text-base"
            />

            <div className="flex gap-4">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="flex-1 px-4 py-2 rounded-2xl text-gray-600 hover:bg-gray-50 transition font-semibold border border-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLinkSubmit}
                className="flex-1 px-4 py-2 bg-black text-white rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition font-semibold shadow-lg shadow-black/10"
              >
                Add Link
              </button>
            </div>
          </div>
        </div>
      )}
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
//       toast.error("Error: " + (error.message || "Unknown error"));
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
