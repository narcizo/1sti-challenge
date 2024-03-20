export const metadata = {
    title: 'Weather App',
    description: '1STi Challenge',
    icons: {
        icon: '/icon.ico',
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
            <body>{children}</body>
        </html>
    );
}
