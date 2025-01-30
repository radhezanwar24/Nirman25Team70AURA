import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await fetch('http://localhost/skillswap-api/skills.php')
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await fetch('http://localhost/skillswap-api/skills.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to create skill' },
      { status: 500 }
    )
  }
}
