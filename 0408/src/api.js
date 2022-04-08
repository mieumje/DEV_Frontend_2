export const API_END_POINT = 'https://kdt-frontend.todo-api.programmers.co.kr';

export const request = async (url, options = {}) => {
    try {
        const res = await fetch(`${API_END_POINT}${url}`, options)

        if (res.ok) {
            return await res.json()
        }

        throw new Error('API 처리중 뭔가 이상합니다!')
    } catch (e) {
        alert(e.message)
    }
}