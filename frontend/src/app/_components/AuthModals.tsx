'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/cn';
import * as m from '@/paraglide/messages.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { LogIn, UserPlus, Mail, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSwitchMode?: () => void;
  customSubheader?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onSwitchMode,
  customSubheader,
}: AuthModalProps) {
    const router = useRouter();
    const [email, setEmail] = useState('');
  const [isEmailMode, setIsEmailMode] = useState(false);
    const login = ({authUrlParams}: {authUrlParams: {connection_id: string, login_hint?: string}}) => {
        router.push(`/api/auth/login?${new URLSearchParams(authUrlParams).toString()}`);
    };
    const register = ({authUrlParams}: {authUrlParams: {connection_id: string, login_hint?: string}}) => {
        router.push(`/api/auth/register?${new URLSearchParams(authUrlParams).toString()}`);
    };

  const handleGoogleAuth = () => {
    const authFunction = mode === 'login' ? login : register;
    authFunction({
      authUrlParams: {
        connection_id: "conn_01910eed1be82e1adb1c1bce05ac07b5",
      },
    });
  };

  const handleEmailAuth = () => {
    if (!email) {
      return;
    }
    const authFunction = mode === 'login' ? login : register;
    authFunction({
      authUrlParams: {
        connection_id: "",
        login_hint: email,
      },
    });
  };



  const handleFacebookAuth = () => {
    const authFunction = mode === 'login' ? login : register;
    authFunction({
      authUrlParams: {
        connection_id: "conn_019ab6978a4828cedb7248ee7f962877",
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[calc(100vw-2rem)] max-h-[90vh] overflow-y-auto rounded-lg">
        {/* Close Button */}
        <DialogClose className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-10">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>

        <DialogHeader className="pr-8">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center transition-all duration-200">
            {mode === 'login' ? (
              <div className="flex items-center justify-center gap-2">
                <LogIn className="h-5 w-5 sm:h-6 sm:w-6" />
                {m.plane_weird_macaw_slurp()}
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <UserPlus className="h-5 w-5 sm:h-6 sm:w-6" />
                {m.stock_giant_firefox_belong()}
              </div>
            )}
          </DialogTitle>
          <DialogDescription className="text-center text-sm sm:text-base transition-all duration-200">
            {customSubheader || (mode === 'login'
              ? m.born_muddy_halibut_talk()
              : m.ideal_lime_impala_view())}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 sm:space-y-4 py-2 sm:py-4 transition-all duration-200">
          {/* Google Authentication */}
          <button
            onClick={handleGoogleAuth}
            type="button"
            className={cn(
              'w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base',
              'bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300',
              'transition-all duration-200 shadow-sm hover:shadow-md',
              'text-gray-700 active:scale-[0.98]'
            )}
          >
            <Image
              src="/assets/g-logo.png"
              alt="Google"
              width={20}
              height={20}
              className="size-4 sm:size-5 flex-shrink-0"
            />
            <span className="truncate">{m.sea_spare_crab_startle()}</span>
          </button>

          {/* Facebook Authentication */}
          <button
            onClick={handleFacebookAuth}
            type="button"
            className={cn(
              'w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base',
              'bg-[#1877F2] hover:bg-[#166FE5] text-white',
              'transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]'
            )}
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-label="Facebook"
            >
              <title>Facebook</title>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            <span className="truncate">{m.crazy_frail_anaconda_reside()}</span>
          </button>

          {/* Divider */}
          <div className="relative py-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 sm:px-3 bg-white text-gray-500">{m.top_sad_pug_honor()}</span>
            </div>
          </div>

          {/* Email Authentication */}
          {!isEmailMode ? (
            <button
              onClick={() => setIsEmailMode(true)}
              type="button"
              className={cn(
                'w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-lg font-medium text-sm sm:text-base',
                'bg-primary hover:bg-primary/90 text-white',
                'transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.98]'
              )}
            >
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="truncate">{m.safe_stout_grebe_dream()}</span>
            </button>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              <input
                type="email"
                placeholder={m.sour_dark_larva_leap()}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border-2 border-gray-200 text-sm sm:text-base',
                  'focus:border-primary focus:outline-none',
                  'transition-colors duration-200'
                )}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailAuth();
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsEmailMode(false)}
                  className={cn(
                    'flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base',
                    'bg-gray-100 hover:bg-gray-200 text-gray-700',
                    'transition-colors duration-200 active:scale-[0.98]'
                  )}
                >
                  {m.empty_flaky_cougar_reap()}
                </button>
                <button
                  type="button"
                  onClick={handleEmailAuth}
                  disabled={!email}
                  className={cn(
                    'flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm sm:text-base',
                    'bg-primary hover:bg-primary/90 text-white',
                    'transition-colors duration-200 active:scale-[0.98]',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                  )}
                >
                  {m.lazy_raw_penguin_treat()}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-xs sm:text-sm text-gray-500 pt-1 sm:pt-2 pb-1">
          {mode === 'login' ? (
            <p>
              {m.flaky_sleek_fly_glow()}{' '}
              <button
                type="button"
                onClick={onSwitchMode}
                className="text-primary hover:underline font-medium transition-colors"
              >
                {m.drab_icy_cowfish_wave()}
              </button>
            </p>
          ) : (
            <p>
              {m.wild_gray_bullock_lead()}{' '}
              <button
                type="button"
                onClick={onSwitchMode}
                className="text-primary hover:underline font-medium transition-colors"
              >
                {m.few_maroon_trout_quiz()}
              </button>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

