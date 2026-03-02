'use client';

import { CheckCircle2, Phone, MapPin, Calendar } from 'lucide-react';

export function CampaignHero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
      
      <div className="relative max-w-6xl mx-auto px-4 py-16">
        {/* Top Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/40">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-accent">Bar Council Election Campaign</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance">
            PRIYA LEGHA
          </h1>
          <p className="text-xl text-muted-foreground mb-2">ADVOCATE</p>
          <p className="text-lg text-foreground font-semibold mb-6">
            As Member Bar Council – Punjab and Haryana
          </p>
        </div>

        {/* CTA Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-border hover:border-primary transition-colors">
            <CheckCircle2 className="w-10 h-10 text-accent mb-3" />
            <p className="font-bold text-lg text-foreground mb-1">VOTE</p>
            <p className="text-sm text-muted-foreground text-center">Cast your precious vote</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-border hover:border-primary transition-colors">
            <CheckCircle2 className="w-10 h-10 text-accent mb-3" />
            <p className="font-bold text-lg text-foreground mb-1">SUPPORT</p>
            <p className="text-sm text-muted-foreground text-center">Show your support</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white rounded-xl border border-border hover:border-primary transition-colors">
            <CheckCircle2 className="w-10 h-10 text-accent mb-3" />
            <p className="font-bold text-lg text-foreground mb-1">ELECT</p>
            <p className="text-sm text-muted-foreground text-center">Help elect strong leadership</p>
          </div>
        </div>

        {/* Ballot Info */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 mb-12 text-white text-center">
          <p className="text-lg mb-2">1st / Best Preference Vote</p>
          <p className="text-5xl font-bold">Ballot No. 137</p>
        </div>

        {/* Address Card */}
        <div className="bg-white rounded-xl border border-border p-8 mb-12">
          <div className="flex gap-4">
            <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg text-foreground mb-2">Office Address</h3>
              <p className="text-foreground font-semibold">Chamber No. 306</p>
              <p className="text-muted-foreground">District and Session Courts, Bhiwani</p>
              <p className="text-muted-foreground">(Punjab & Haryana High Court, Chandigarh)</p>
            </div>
          </div>
        </div>

        {/* Voting Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex gap-3 mb-3">
              <Calendar className="w-6 h-6 text-accent flex-shrink-0" />
              <h3 className="font-bold text-lg text-foreground">17 March</h3>
            </div>
            <p className="text-muted-foreground ml-9">Punjab & Haryana High Court</p>
          </div>
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex gap-3 mb-3">
              <Calendar className="w-6 h-6 text-accent flex-shrink-0" />
              <h3 className="font-bold text-lg text-foreground">18 March</h3>
            </div>
            <p className="text-muted-foreground ml-9">All District Courts and Sub-Divisional Courts of Punjab and Haryana</p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-accent/10 rounded-xl border border-accent/30 p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 flex gap-2 items-center">
            <Phone className="w-6 h-6 text-accent" />
            Contact Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted-foreground font-semibold mb-1">Facebook</p>
              <p className="text-foreground font-semibold">priyalegha01</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-semibold mb-1">Instagram</p>
              <p className="text-foreground font-semibold">adv.priyalegha</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-semibold mb-1">Phone / WhatsApp</p>
              <p className="text-foreground font-semibold">90344-44612</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
