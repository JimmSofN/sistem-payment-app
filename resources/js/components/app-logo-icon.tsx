import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} width="320" height="100" viewBox="0 0 320 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="#E41111" />
            <circle cx="160" cy="50" r="50" fill="#FFA807" />
            <circle cx="270" cy="50" r="50" fill="#31F314" />
        </svg>
    );
}
