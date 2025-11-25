export declare class AppController {
    getIndex(): {
        message: string;
        description: string;
        versions: {
            v1: {
                path: string;
                auth: boolean;
                description: string;
            };
            v2: {
                path: string;
                auth: boolean;
                description: string;
            };
        };
        documentation: string;
        auth: {
            login: string;
        };
    };
}
