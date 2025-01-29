import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('user_id')
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      )
    }

    const response = await fetch(
      `http://localhost/skillswap-api/user_skills.php?user_id=${userId}`
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching user skills:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch user skills' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const response = await fetch('http://localhost/skillswap-api/user_skills.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error adding user skill:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to add user skill' },
      { status: 500 }
    )
  }
}
