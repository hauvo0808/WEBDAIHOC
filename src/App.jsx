import { useMemo, useState } from 'react'
import { ListChecks } from 'lucide-react'
import { useWishlist } from './hooks/useWishlist'
import WishlistDrawer from './components/wishlist/WishlistDrawer'
import Sidebar from './components/layout/Sidebar'
import ScoreInputTab from './components/tabs/ScoreInputTab'
import TopCombinationsTab from './components/tabs/TopCombinationsTab'
import TuitionTab from './components/tabs/TuitionTab'
import SchoolSuggestionTab from './components/tabs/SchoolSuggestionTab'
import ChartTab from './components/tabs/ChartTab'
import { EMPTY_SCORES } from './utils/subjects'
import { calculateAllCombinations, getTopCombinations } from './utils/scoring'

export default function App() {
  const [activeTab, setActiveTab] = useState('nhap-diem')
  const [scores, setScores] = useState(EMPTY_SCORES)
  const [khuVuc, setKhuVuc] = useState('KV3')
  const [doiTuong, setDoiTuong] = useState('none')

  const allCombinationResults = useMemo(
    () => calculateAllCombinations(scores, khuVuc, doiTuong),
    [scores, khuVuc, doiTuong]
  )
  const top10 = useMemo(
    () => getTopCombinations(scores, khuVuc, doiTuong, 10),
    [scores, khuVuc, doiTuong]
  )

  const handleChangeScore = (id, value) =>
    setScores((prev) => ({ ...prev, [id]: value }))

  const handleResetScores = () => setScores(EMPTY_SCORES)

  const goToInput = () => setActiveTab('nhap-diem')
  const { wishlist, isOpen, openDrawer, closeDrawer, addItem, removeItem, reorder } = useWishlist()

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar activeTab={activeTab} onChangeTab={setActiveTab} />

      <main className="scroll-thin flex-1 overflow-y-auto">
        <div className="flex justify-end px-4 pt-4 sm:px-6 lg:px-10">
  <button
    onClick={openDrawer}
    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white
               text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
  >
    <ListChecks size={16} />
    Nguyện vọng ({wishlist.length})
  </button>
</div>
        <div className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          {activeTab === 'nhap-diem' && (
            <ScoreInputTab
              scores={scores}
              onChangeScore={handleChangeScore}
              onResetScores={handleResetScores}
              khuVuc={khuVuc}
              onChangeKhuVuc={setKhuVuc}
              doiTuong={doiTuong}
              onChangeDoiTuong={setDoiTuong}
            />
          )}

          {activeTab === 'top-to-hop' && (
            <TopCombinationsTab results={top10} onGoToInput={goToInput} />
          )}

          {activeTab === 'goi-y-truong' && (
            <SchoolSuggestionTab
              allCombinationResults={allCombinationResults}
              onGoToInput={goToInput}
              onAddToWishlist={addItem}
            />
          )}

          {activeTab === 'bieu-do' && (
            <ChartTab allCombinationResults={allCombinationResults} />
          )}
          {activeTab === 'tuition' && <TuitionTab />}
        </div>
        <WishlistDrawer
          wishlist={wishlist}
          isOpen={isOpen}
          onClose={closeDrawer}
          onAdd={addItem}
          onRemove={removeItem}
          onReorder={reorder}
        />
      </main>
    </div>
  )
}
