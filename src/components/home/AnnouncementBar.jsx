import { ArrowRight, Phone } from "lucide-react";
import { clinic } from "@/data/clinic";

export default function AnnouncementBar() {
  return (
    <div className="relative z-[60] bg-secondary text-white">
      <div className="container-page flex h-10 items-center justify-center gap-3 text-[0.8rem] sm:justify-between">
        <p className="flex items-center gap-2 text-white/85">
          <span className="hidden h-1.5 w-1.5 rounded-full bg-accent sm:inline-block" aria-hidden="true" />
          <span className="hidden sm:inline">Your Smile Deserves Expert Care</span>
          <span className="hidden text-white/30 sm:inline" aria-hidden="true">|</span>
          <a href="#appointment" className="group inline-flex items-center gap-1.5 font-semibold text-accent hover:text-white">
            Book Your Dental Consultation
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </p>
        <a href={clinic.phone.tel} className="hidden items-center gap-2 text-white/80 transition-colors hover:text-white sm:inline-flex">
          <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          {clinic.phone.display}
        </a>
      </div>
    </div>
  );
}
