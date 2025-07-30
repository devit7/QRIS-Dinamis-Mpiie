import Script from 'next/script'

// Extend Window interface to include gtag
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

interface GoogleAnalyticsProps {
    GA_MEASUREMENT_ID: string
}

export const GoogleAnalytics = ({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) => {
    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
                }}
            />
        </>
    )
}

interface GoogleTagManagerProps {
    GTM_ID: string
}

export const GoogleTagManager = ({ GTM_ID }: GoogleTagManagerProps) => {
    return (
        <>
            <Script
                id="google-tag-manager"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
                }}
            />
            <noscript
                dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
                }}
            />
        </>
    )
}

// Utility function to track events
export const gtag = (...args: unknown[]) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag(...args)
    }
}

// Common tracking events
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>) => {
    gtag('event', eventName, parameters)
}

export const trackPageView = (url: string) => {
    gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_location: url,
    })
}
