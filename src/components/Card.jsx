
import { Card } from 'flowbite-react';

export default function Component({title, children}) {
    return (
        <Card className="max-w-sm text-center">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                {children}
            </p>
        </Card>
    );
}