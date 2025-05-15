import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
    title: 'Moneed',
    icons: {
        icon: '/favicon_48.png',
    },
    viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='en'>
            <head>
                <meta charSet='UTF-8' />
            </head>
            <body>
                {/* GTM noscript */}
                <noscript>
                    <iframe
                        src={`https://www.googletagmanager.com/ns.html?id=${import.meta.env.VITE_GTM_KEY}`}
                        height='0'
                        width='0'
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>

                <div id='root'>{children}</div>

                {/* GA 설치 */}
                <Script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`}
                    strategy='afterInteractive'
                />
                <Script id='google-analytics' strategy='afterInteractive'>
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', '${import.meta.env.VITE_GA_ID}');
          `}
                </Script>

                {/* GTM 설치 */}
                <Script id='google-tag-manager' strategy='afterInteractive'>
                    {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${import.meta.env.VITE_GTM_KEY}');
          `}
                </Script>

                {/* Microsoft Clarity 설치 */}
                <Script id='microsoft-clarity' strategy='afterInteractive'>
                    {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||[];
              c[a].push({start:new Date().getTime(),event:'initialize'});
              i=l.createElement(r);
              i.async=1;
              i.src='https://www.clarity.ms/tag/'+'${import.meta.env.VITE_CLARITY_TRACKING_ID}';
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(i,y);
            })(window,document,'clarity','script','${import.meta.env.VITE_CLARITY_TRACKING_ID}');
          `}
                </Script>
            </body>
        </html>
    );
}
