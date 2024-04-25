// Added this on the 22/04/2024, 14:08 as a temporary fix to pdf-master types
declare module 'pdf-master' {
    export function generatePdf(
        htmlTemplatePath: string,
        data: { name: string; date: string; image: string },
        options: {
            displayHeaderFooter: boolean;
            format: string;
            margin: { top: string | null; bottom: string | null };
        },
    ): Promise<any>;
}
