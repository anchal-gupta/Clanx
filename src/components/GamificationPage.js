import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import gamificationCards from "../constants/gamificationCards";
import FeatureCard from "./FeatureCard";
import GamificationHero from "./GamificationHero";
import GamificationModal from "./gamification/GamificationModal";
import Toast from "./gamification/Toast";
import Sidebar from "./Sidebar";
import GamificationPageHeader from "./GamificationPageHeader";
import {
  clearToast,
  closeModal,
  openModal,
  selectIsModalOpen,
  selectToast,
} from "../store/gamificationSlice";

const GamificationPage = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(selectIsModalOpen);
  const toast = useSelector(selectToast);
  const enableButtonRef = useRef(null);
  const previousOpenRef = useRef(false);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      dispatch(clearToast());
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [dispatch, toast]);

  useEffect(() => {
    if (previousOpenRef.current && !isModalOpen) {
      enableButtonRef.current?.focus();
    }

    previousOpenRef.current = isModalOpen;
  }, [isModalOpen]);

  return (
    <main className="flex min-h-screen bg-magenta-3">
      <Sidebar />
      <div className="min-w-0 flex-1 bg-background px-6 pb-16 pt-5 md:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col">
          <GamificationPageHeader />
          <section className="relative">
            <GamificationHero
              enableButtonRef={enableButtonRef}
              onEnable={() => dispatch(openModal())}
            />
            <div className="-mt-feature-grid-overlap grid justify-center gap-6 px-feature-grid-horizontal-padding md:grid-cols-feature-cards md:px-0">
              {gamificationCards.map((card) => (
                <FeatureCard
                  key={card.title}
                  description={card.description}
                  icon={card.icon}
                  title={card.title}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      {isModalOpen ? <GamificationModal onClose={() => dispatch(closeModal())} /> : null}
      {toast ? <Toast message={toast.message} /> : null}
    </main>
  );
};

export default GamificationPage;
