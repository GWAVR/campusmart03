/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Shield, ShieldCheck, ArrowRight, CheckCircle2, Award, Landmark, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { triggerHaptic, hapticPatterns } from '../utils/haptics';

interface WelcomeScreenProps {
  onVerifyEdu: (userName: string, email: string, university: string, isAdmin?: boolean) => void;
  onSkipVerify: () => void;
  isDarkMode?: boolean;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onVerifyEdu, onSkipVerify, isDarkMode = false }) => {
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [eduInput, setEduInput] = useState('University of Tech');
  const [isVerifyingState, setIsVerifyingState] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [isAdminLoginSelected, setIsAdminLoginSelected] = useState(false);

  const [showAuthForm, setShowAuthForm] = useState(false);

  const handleAdminBypass = () => {
    triggerHaptic(hapticPatterns.medium);
    setIsVerifyingState(true);
    setNameInput('Admin Moderator');
    setEmailInput('admin@campusmart.edu');
    setEduInput('CampusMart HQ');
    setIsAdminLoginSelected(true);
    
    setTimeout(() => {
      setIsVerifyingState(false);
      setSuccessAnimation(true);
      triggerHaptic(hapticPatterns.success);
      setTimeout(() => {
        onVerifyEdu('Admin Moderator', 'admin@campusmart.edu', 'CampusMart HQ', true);
      }, 1500);
    }, 1200);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) {
      triggerHaptic(hapticPatterns.warning);
      setErrorText('Please enter your full name');
      return;
    }
    if (!emailInput.trim()) {
      triggerHaptic(hapticPatterns.warning);
      setErrorText('Please enter your university email');
      return;
    }
    if (!emailInput.toLowerCase().endsWith('.edu')) {
      triggerHaptic(hapticPatterns.warning);
      setErrorText('Access requires a valid .edu email address (e.g., student@university.edu)');
      return;
    }

    setErrorText('');
    setIsVerifyingState(true);
    triggerHaptic(hapticPatterns.medium);

    // Determine if admin based on email
    const isEmailAdmin = emailInput.toLowerCase().includes('admin');

    // Simulate verification
    setTimeout(() => {
      setIsVerifyingState(false);
      setSuccessAnimation(true);
      triggerHaptic(hapticPatterns.success);
      setTimeout(() => {
        onVerifyEdu(nameInput, emailInput, eduInput, isEmailAdmin);
      }, 1500);
    }, 1800);
  };

  return (
    <div className={`w-full min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-[#0F172A] text-slate-100' : 'bg-[#F8FAFC] text-slate-900'} flex flex-col items-center`}>
      {/* Top Header */}
      <header className="w-full h-16 flex justify-between items-center px-4 max-w-[1280px] z-50">
        <div className="flex items-center gap-2">
          <Landmark className={`${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'} w-7 h-7`} />
          <h1 className={`text-xl font-bold font-display ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>CampusMart</h1>
        </div>
        <div className="flex gap-2.5">
          <button 
            onClick={handleAdminBypass}
            className={`text-xs font-semibold px-3 py-1.5 border rounded-lg transition-all flex items-center gap-1.5 ${
              isDarkMode 
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-slate-950 hover:border-amber-500' 
                : 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-500 hover:text-white hover:border-amber-500'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            Admin Access
          </button>
          <button 
            onClick={() => {
              triggerHaptic(hapticPatterns.light);
              onSkipVerify();
            }}
            className={`text-xs font-semibold px-3 py-1.5 border rounded-lg transition-colors ${
              isDarkMode 
                ? 'border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white' 
                : 'border-slate-300 text-slate-600 hover:bg-slate-100'
            }`}
          >
            Quick Guest View
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 px-4 py-6 max-w-[1280px]">
        
        {/* Left Column: Visual Asset Badge Card */}
        <div className="w-full lg:w-1/2 flex flex-col space-y-6">
          <div className={`relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-xl bg-slate-900 border ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent z-10" />
            <img 
              className="w-full h-full object-cover select-none opacity-85" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr0-essm33SWNbcre_hwQ9S_6UWpWoiLPwHL4JFqhs0qDvVLBMMiNhAJJjLYKOv-WiMJJcL8PedHNyP2NwXvwr-ElhUWocU5pFgpMspaaD_3m57QCCNonNa2HARNL2wCrgVpunCOq4r_jMTFj6skIBRyexYGnt2psnNuKXe8oB4_2NRd2zUfIXHrPzpea6eM_sAEqfVpdOuyjD9eEgMtEOVx4EOpdPOZeike12pRU4dAMVnF79RmLqexp0m-jRe5rkKqbUS9P9vA" 
              alt="University store community students trading diagram" 
            />
            
            <div className="absolute bottom-6 left-6 z-20 text-white right-6">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="text-[#2ECC71] w-5 h-5 fill-current" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-100">TRUSTED BY 50K+ STUDENTS</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold font-display text-white leading-tight">
                The safest way to buy and sell on campus.
              </h2>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border flex items-start gap-3 shadow-xs ${isDarkMode ? 'bg-[#1E293B]/60 border-slate-800' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="p-2 rounded-lg bg-[#3498DB]/10 text-[#3498DB]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>Verified Email</p>
                <p className="text-xs text-slate-400 mt-0.5">Mandatory .edu access</p>
              </div>
            </div>
            
            <div className={`p-4 rounded-2xl border flex items-start gap-3 shadow-xs ${isDarkMode ? 'bg-[#1E293B]/60 border-slate-800' : 'bg-white border-[#E2E8F0]'}`}>
              <div className="p-2 rounded-lg bg-[#2ECC71]/10 text-[#2ECC71]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-semibold text-sm ${isDarkMode ? 'text-slate-200' : 'text-[#1A2B4C]'}`}>Safe Meetups</p>
                <p className="text-xs text-slate-400 mt-0.5">Designated zones</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interaction Form panel */}
        <div className={`w-full lg:w-[460px] p-6 md:p-8 rounded-[32px] shadow-xl border flex flex-col gap-6 relative overflow-hidden transition-colors ${
          isDarkMode ? 'bg-[#1E293B] border-slate-800' : 'bg-white border-[#E2E8F0]'
        }`}>
          
          {successAnimation ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 rounded-full bg-[#2ECC71]/10 text-[#2ECC71] flex items-center justify-center mb-6"
              >
                {isAdminLoginSelected ? <Shield className="w-12 h-12 text-[#F39C12]" /> : <CheckCircle2 className="w-12 h-12" />}
              </motion.div>
              <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>
                {isAdminLoginSelected ? 'Admin Portal Ready!' : 'Verified Successfully!'}
              </h3>
              <p className="text-slate-400 text-sm">
                {isAdminLoginSelected ? 'Launching CampusMart Moderator Dashboard...' : 'Welcome to the CampusMart community...'}
              </p>
            </div>
          ) : showAuthForm ? (
            <div className="flex flex-col gap-4">
              <h3 className={`text-lg font-bold ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Enter Student Details</h3>
              <p className="text-slate-400 text-xs">Access requires setting up your verified profile.</p>

              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Alex Rivera" 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    required
                    className={`w-full p-3 rounded-xl border text-sm outline-none ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-slate-100 focus:ring-2 focus:ring-[#F39C12]' 
                        : 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#1A2B4C]'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>University Email (.edu required)</label>
                  <input 
                    type="email" 
                    placeholder="alex.rivera@university.edu" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                    className={`w-full p-3 rounded-xl border text-sm outline-none ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-slate-100 focus:ring-2 focus:ring-[#F39C12]' 
                        : 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#1A2B4C]'
                    }`}
                  />
                  <p className="text-[10px] text-slate-400 mt-1">We will verify your student status instantly.</p>
                </div>

                <div>
                  <label className={`block text-xs font-semibold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-700'}`}>Select University</label>
                  <select 
                    value={eduInput}
                    onChange={(e) => setEduInput(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-sm outline-none ${
                      isDarkMode 
                        ? 'bg-slate-900 border-slate-700 text-slate-100 focus:ring-2 focus:ring-[#F39C12]' 
                        : 'bg-white border-slate-300 text-slate-900 focus:ring-2 focus:ring-[#1A2B4C]'
                    }`}
                  >
                    <option value="University of Tech">University of Tech</option>
                    <option value="Stanford University">Stanford University</option>
                    <option value="MIT">MIT</option>
                    <option value="Harvard University">Harvard University</option>
                    <option value="UC Berkeley">UC Berkeley</option>
                  </select>
                </div>

                {errorText && (
                  <p className="text-red-500 text-xs mt-1 font-medium bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">{errorText}</p>
                )}

                <div className="flex gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowAuthForm(false)}
                    className={`flex-1 py-3 text-sm font-semibold rounded-xl border transition-colors ${
                      isDarkMode 
                        ? 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700' 
                        : 'bg-slate-50 text-[#1A2B4C] border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={isVerifyingState}
                    className="flex-1 py-3 text-white text-sm font-semibold rounded-xl bg-[#F39C12] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    {isVerifyingState ? 'Verifying...' : 'Submit'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="text-center md:text-left">
                <h3 className={`text-xl font-bold font-display mb-2 ${isDarkMode ? 'text-slate-100' : 'text-[#1A2B4C]'}`}>Join Your Community</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Buy textbooks, furniture, and more from students you can trust.
                </p>
              </div>

              {/* Requirement bar */}
              <div className={`p-4 rounded-2xl border flex items-start gap-3 ${
                isDarkMode ? 'bg-slate-900/55 border-slate-800' : 'bg-[#1A2B4C]/5 border-[#1A2B4C]/15'
              }`}>
                <div className={`${isDarkMode ? 'bg-[#F39C12] text-slate-950' : 'bg-[#1A2B4C] text-white'} p-2.5 rounded-full mt-0.5`}>
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className={`font-bold text-sm ${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'}`}>College Email Required</p>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                    Only students with a valid university email can join the marketplace.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setShowAuthForm(true)}
                  className="w-full h-12 bg-[#F39C12] hover:opacity-95 text-white font-semibold text-sm rounded-xl shadow-md tracking-wide hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>

                <button 
                  onClick={() => {
                    setNameInput('Alex Rivera');
                    setEmailInput('alex.rivera@university.edu');
                    setEduInput('University of Tech');
                    setShowAuthForm(true);
                  }}
                  className={`w-full h-12 border rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all font-semibold text-sm ${
                    isDarkMode 
                      ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700' 
                      : 'bg-white border-[#E2E8F0] hover:bg-slate-50 text-[#1A2B4C]'
                  }`}
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  Continue with Student Email
                </button>
              </div>

              {/* Already a member */}
              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDarkMode ? 'border-slate-800' : 'border-[#E2E8F0]'}`}></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className={`px-3 ${isDarkMode ? 'bg-[#1E293B] text-slate-400' : 'bg-white text-slate-400'}`}>Already a member?</span>
                </div>
              </div>

              <button 
                onClick={() => setShowAuthForm(true)}
                className={`text-xs font-bold hover:underline transition-all text-center ${isDarkMode ? 'text-[#F39C12]' : 'text-[#1A2B4C]'}`}
              >
                Login to your account
              </button>

              {/* Trust badges footer */}
              <div className="flex justify-center gap-6 opacity-40 hover:opacity-80 transition-opacity">
                <Shield className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <Award className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                <CheckCircle2 className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`w-full py-6 text-center border-t mt-8 transition-colors ${
        isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-[#E2E8F0]'
      }`}>
        <p className="text-xs text-slate-400 font-medium">© 2026 CampusMart Inc. Strictly for university-verified students.</p>
        <div className="flex justify-center gap-4 mt-1">
          <a href="#" className="text-xs text-slate-400 hover:text-[#1A2B4C]">Privacy Policy</a>
          <a href="#" className="text-xs text-slate-400 hover:text-[#1A2B4C]">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};
