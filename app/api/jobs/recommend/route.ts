import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: Request) {
    try {
        const { skills } = await req.json();

        if (!Array.isArray(skills) || skills.length === 0) {
            return NextResponse.json(
                { error: 'Skills must be provided as a non-empty array' },
                { status: 400 }
            );
        }

        return new Promise((resolve) => {
            console.log('Starting Python process with skills:', skills);
            const skillsString = skills.join(',');
            
            const pythonProcess = spawn('python', [
                path.join(process.cwd(), 'ml_service/job_recommender.py'),
                skillsString
            ]);

            let result = '';
            let error = '';

            pythonProcess.stdout.on('data', (data) => {
                console.log('Python stdout:', data.toString());
                result += data.toString();
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error('Python stderr:', data.toString());
                error += data.toString();
            });

            pythonProcess.on('close', (code) => {
                console.log('Python process exited with code:', code);
                if (code !== 0) {
                    console.error('Python process error output:', error);
                    resolve(
                        NextResponse.json(
                            { error: `Failed to process job recommendations. Error: ${error}` },
                            { status: 500 }
                        )
                    );
                    return;
                }

                try {
                    const recommendations = JSON.parse(result);
                    console.log('Successfully parsed recommendations:', recommendations.length);
                    resolve(NextResponse.json({ recommendations }));
                } catch (e) {
                    console.error('Failed to parse recommendations:', e);
                    console.error('Raw result:', result);
                    resolve(
                        NextResponse.json(
                            { error: 'Failed to parse recommendations' },
                            { status: 500 }
                        )
                    );
                }
            });

            pythonProcess.on('error', (err) => {
                console.error('Failed to start Python process:', err);
                resolve(
                    NextResponse.json(
                        { error: 'Failed to start job recommendation process' },
                        { status: 500 }
                    )
                );
            });
        });
    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
