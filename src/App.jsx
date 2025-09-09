import { useState, useEffect, useRef } from 'react';

const WHOLEDATA = [
  { id: 1, name: 'Randall Johnsson', status: 'Active now', type: 'people', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=RJ' },
  { id: 2, name: 'Random Michal Folder', status: '12 Files', type: 'folder', avatar: 'https://placehold.co/40x40/64748b/ffffff?text=MF' },
  { id: 3, name: 'kristine_file_frandkies.jpg', status: 'In Photos/Assets • Edited 12m ago', type: 'file', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=IMG' },
  { id: 4, name: 'Kristinge Karand', status: 'Active 2d ago', type: 'people', avatar: 'https://placehold.co/40x40/64748b/ffffff?text=KK' },
  { id: 5, name: 'files_krande_michelle.avi', status: 'In Videos • Added 12m ago', type: 'file', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=VID' },
  { id: 6, name: 'Caroline Dribsson', status: 'Unactivated', type: 'people', avatar: 'https://placehold.co/40x40/64748b/ffffff?text=CD' },
  { id: 7, name: 'Adam Cadribean', status: 'Active 1w ago', type: 'people', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=AC' },
  { id: 8, name: 'final_dribbble_presentation.jpg', status: 'In Presentations • Edited 1w ago', type: 'file', avatar: 'https://placehold.co/40x40/64748b/ffffff?text=PR' },
  { id: 9, name: 'Margareth Cendribgssen', status: 'Active 1w ago', type: 'people', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=MC' },
  { id: 10, name: 'dribbble_animation.avi', status: 'In Videos • Added 2m ago', type: 'file', avatar: 'https://placehold.co/40x40/64748b/ffffff?text=ANI' },
  { id: 11, name: 'Dribbble Folder', status: '12 Files', type: 'folder', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=DF' },
  { id: 12, name: 'Project Alpha Chat', status: '8 new messages', type: 'chat', avatar: 'https://placehold.co/40x40/fcd34d/000000?text=CHAT' },
  { id: 13, name: 'Team Sync Discussion', status: 'Last message 5h ago', type: 'chat', avatar: 'https://placehold.co/40x40/fcd34d/000000?text=CHAT' },
  { id: 14, name: 'Marketing Brainstorm', status: '2 unread messages', type: 'chat', avatar: 'https://placehold.co/40x40/fcd34d/000000?text=CHAT' },
  { id: 15, name: 'Design Review Channel', status: '2 new messages', type: 'chat', avatar: 'https://placehold.co/40x40/fcd34d/000000?text=CHAT' },
  { id: 16, name: 'Quarterly Report Q3.pdf', status: 'In Finance • Added 3d ago', type: 'file', avatar: 'https://placehold.co/40x40/48bb78/ffffff?text=PDF' },
  { id: 17, name: 'Personal Documents', status: '35 Files', type: 'folder', avatar: 'https://placehold.co/40x40/64748b/ffffff?text=PF' },
  { id: 18, name: 'Michael Johnson', status: 'Unactivated', type: 'people', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=MJ' },
  { id: 19, name: 'Product Launch Chat', status: '4 unread messages', type: 'chat', avatar: 'https://placehold.co/40x40/fcd34d/000000?text=CHAT' },
  { id: 20, name: 'Design Assets', status: '68 Files', type: 'folder', avatar: 'https://placehold.co/40x40/64748b/ffffff?text=DA' },
  { id: 21, name: 'User Feedback Survey.docx', status: 'In Research • Edited 2h ago', type: 'file', avatar: 'https://placehold.co/40x40/3182ce/ffffff?text=DOC' },
  { id: 22, name: 'Sales Team', status: 'Active 2h ago', type: 'people', avatar: 'https://placehold.co/40x40/94a3b8/ffffff?text=ST' },
  { id: 23, name: 'Company Policy.pdf', status: 'In HR • Added 1d ago', type: 'file', avatar: 'https://placehold.co/40x40/48bb78/ffffff?text=PDF' },
  { id: 24, name: 'Client A Project Chat', status: 'Last message 1d ago', type: 'chat', avatar: 'https://placehold.co/40x40/fcd34d/000000?text=CHAT' },
];

const FilterButton = ({ label, count, onClick, active }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm transition-all duration-300 ${active ? 'font-medium border-b-2' : 'text-gray-500 hover:bg-gray-100'}`}
  >
    {label} {count > 0 && <span className="text-xs ml-1 bg-[#eeeeee] rounded py-1 px-2">{count}</span>}
  </button>
);

const DataRow = ({ item, index, type, currView }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 50);

    return () => clearTimeout(timeout);
  }, [index]);
  if(currView === type || currView === "") 
  return (
    <div className={`flex items-center p-4 rounded-xl hover:bg-gray-100 cursor-pointer space-x-4 transition-all duration-300 transform ease-in-out ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
    }`}>
      <div className="flex-shrink-0">
        <img className="rounded-full w-10 h-10" src={item.avatar} alt={item.name} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-gray-800 font-medium text-sm truncate">{item.name}</div>
        <div className="text-gray-500 text-xs truncate">{item.status}</div>
      </div>
      <div className="flex-shrink-0">
        <div className='flex flex-row'>
          {(item.type === 'folder' || item.type === 'file') && (
            <button className="flex items-center text-gray-500 text-xs px-2 py-1">
              <svg className="w-7 h-7 p-1 mr-1 border border-[#6A7282] rounded-full hover:bg-gray-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.881a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101"></path></svg>
            </button>
          )}
          {item.type === 'file' && (
            <button className="flex items-center text-[#6A7282] text-xs px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
              <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              New Tab
            </button>
          )}
        </div>
      </div>
    </div>
  );
  return <></>
};

const ListItem = ({ items, currView }) => (
  <div className="mt-4 space-y-2">
    {items.map((item, index) => (
      <DataRow key={item.id} currView={currView} item={item} index={index} type={item.type} />
    ))}
  </div>
);

const SearchHeader = ({ inputRef, searchTerm, setSearchTerm, isLoading, onClear, onToggleSettings, filterCounts, showFiles, showPeople, showChats, showLists, currView, setCurrView }) => {
  const handleViewSwitch = (view) => {
    switch(view) {
      case "Lists":
        setCurrView("list");
        break;
      case "Files":
        setCurrView("file");
        break;
      case "People":
          setCurrView("people");
        break;
      case "Chats":
        setCurrView("chat");
        break;
      default:
        setCurrView("");
        break;
    }
  }
  return (
    <div className="px-4 pt-4 pb-0 bg-white rounded-t-xl sticky top-0 z-10">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5  text-[#000]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
  
        <div className="flex justify-center items-center">
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none border-0"
            placeholder={'Searching is easier...'}
            disabled={isLoading}
          />
          {
            (searchTerm.length > 0) && <button className="text-[#000] underline text-[15px] font-medium hover:text-gray-800 transition-colors" onClick={onClear}>Clear</button>
          }
          {
            (searchTerm.length === 0) && <div className="text-[#494949] block text-[15px] font-medium hover:text-gray-800 transition-colors w-[160px]" onClick={onClear}><span className="border-1 border-text-gray mr-[10px] pt-[3px] pb-[4px] px-[8px] rounded-full">s</span>quick access</div>
          }
        </div>
      </div>
      {
        (searchTerm.length > 0)  ?
        <div className="flex items-center justify-between">
          <div className="flex space-x-2 text-sm">
            <FilterButton label="All" count={filterCounts.all} onClick={() => { handleViewSwitch("All"); }} active={currView === ""} />
            {showFiles && <FilterButton label="Files" count={filterCounts.files} onClick={() => { handleViewSwitch("Files"); }} active={currView === "file"} />}
            {showPeople && <FilterButton label="People" count={filterCounts.people} onClick={() => { handleViewSwitch("People"); }} active={currView === "people"} />}
            {showChats && <FilterButton label="Chats" count={filterCounts.chats} onClick={() => { handleViewSwitch("Chats"); }} active={currView === "chat"} />}
            {showLists && <FilterButton label="Lists" count={filterCounts.lists} onClick={() => { handleViewSwitch("Lists"); }} active={currView === "list"} />}
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <button onClick={onToggleSettings} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.525.322 1.012.35 1.48.291m-2.227 1.637a3.024 3.024 0 100 4.275m-6.108 0a3.024 3.024 0 100 4.275"></path></svg>
            </button>
          </div>
        </div> : ""
      }
    </div>
  );
}

const SkeletonList = () => (
  <div className="space-y-4 animate-pulse p-4">
    <div className="h-10 bg-gray-200 rounded-full w-full"></div>
    <div className="h-10 bg-gray-200 rounded-full w-full"></div>
    <div className="h-10 bg-gray-200 rounded-full w-full"></div>
    <div className="h-10 bg-gray-200 rounded-full w-full"></div>
  </div>
);

const SettingsPanel = ({ isVisible, showFiles, setShowFiles, showPeople, setShowPeople, showChats, setShowChats, setShowLists }) => (
  <div
    className={`absolute right-4 top-28 bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-200 z-20 transition-all duration-300 ease-out transform min-w-[120px] ${
      isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
    }`}
  >
    <div className="space-y-2 p-[0px] text-[15px]">
      <div className="flex items-center justify-between">
        <span>Files</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={showFiles} onChange={(e) => setShowFiles(e.target.checked)} />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-800"></div>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <span>People</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={showPeople} onChange={(e) => setShowPeople(e.target.checked)} />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-800"></div>
        </label>
      </div>
      <div className="flex items-center justify-between">
        <span>Chats</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" checked={showChats} onChange={(e) => setShowChats(e.target.checked)} />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-800"></div>
        </label>
      </div>
      <hr className="border-gray-200" />
      <div className="flex items-center justify-between">
        <span>Lists</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" onChange={(e) => setShowLists(e.target.checked)} />
          <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gray-800"></div>
        </label>
      </div>
    </div>
  </div>
);

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showFiles, setShowFiles] = useState(true);
  const [showPeople, setShowPeople] = useState(true);
  const [showChats, setShowChats] = useState(true);
  const [showLists, setShowLists] = useState(false);
  const [currView, setCurrView] = useState("");
  const inputRef = useRef(null);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm); // Avoiding over searching term
    }, 500);
    inputRef.current.focus();
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    // Filter data based on debounced search term and selected filters
    setIsLoading(true);
    const timer = setTimeout(() => {
      const lowercasedQuery = debouncedSearchTerm.toLowerCase();
      if(lowercasedQuery !== "") {
        const filtered = WHOLEDATA.filter(item => item.name.toLowerCase().includes(lowercasedQuery));
        setFilteredData(filtered);
      } else {
        setFilteredData([]);
      }
      setIsLoading(false);
    }, 500); // Simulating fake delay
    inputRef.current.focus();
    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, showFiles, showPeople, showChats, showLists]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.stopPropagation()
      if (document.activeElement !== inputRef.current) {
        if (event.key === 's') {
          inputRef.current.focus();
          return;
        }
        return;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    inputRef.current.focus();
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleClear = () => {
    setSearchTerm('');
    setCurrView("");
    setShowChats(true);
    setShowFiles(true);
    setShowFiles(true);
    setShowPeople(true);
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };
  
  const filterCounts = {
    all: filteredData.length,
    files: filteredData.filter(item => item.type === 'file' || item.type === 'folder').length,
    people: filteredData.filter(item => item.type === 'people').length,
    chats: filteredData.filter(item => item.type === 'chat').length,
    lists: filteredData.filter(item => item.type === 'list').length,
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden font-sans">
        <SearchHeader
          inputRef={inputRef}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          isLoading={isLoading}
          onClear={handleClear}
          onToggleSettings={handleToggleSettings}
          filterCounts={filterCounts}
          showFiles={showFiles}
          showPeople={showPeople}
          showChats={showChats}
          showLists={showLists}
          currView={currView}
          setCurrView={setCurrView}
        />
        {searchTerm.length > 0 && <>
        <div className="p-4 overflow-y-auto max-h-[70vh]">
          {isLoading ? (
            <SkeletonList />
          ) : (
            filteredData.length > 0 ? (
              <ListItem currView={currView} items={filteredData} />
            ) : (
              <div className="text-center text-gray-500 py-10">No results found.</div>
            )
          )}
        </div>
        <SettingsPanel
          isVisible={showSettings}
          showFiles={showFiles}
          setShowFiles={setShowFiles}
          showPeople={showPeople}
          setShowPeople={setShowPeople}
          showChats={showChats}
          setShowChats={setShowChats}
          setShowLists={setShowLists}
        />
        </>}
      </div>
    </div>
  );
};

export default App;
