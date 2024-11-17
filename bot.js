import TelegramBot from 'node-telegram-bot-api';
const token = '7148801551:AAGUVsuhtbGYWGR3zRpyqSekYpVM_46U_9A';
const bot = new TelegramBot(token, { polling: true });

// Har bir chat uchun o'yin ma'lumotlarini saqlash
const games = {};

// Foydalanuvchiga matritsani yuborish funksiyasi
async function renderBoard(chatId, board, messageId) {
    const keyboard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => ({
            text: cell,
            callback_data: `${rowIndex}_${colIndex}`
        }))
    );

    if (messageId) {
        // Eski xabarni o'zgartirish
        await bot.editMessageReplyMarkup(
            { inline_keyboard: keyboard },
            { chat_id: chatId, message_id: messageId }
        );
    } else {
        // Yangi xabarni yuborish
        await bot.sendMessage(chatId, "O'yin boshlandi!", {
            reply_markup: { inline_keyboard: keyboard }
        });
    }
}

// Start yoki game komandasi kelganda ishlaydigan bo'lim
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text;
    const user = msg.chat.first_name || msg.chat.username || "do'stim";

    if (messageText === '/start') {
        bot.sendMessage(chatId, `Salom ${user}, botga xush kelibsiz! O'yinni boshlash uchun /game ni yuboring.`);
    } else if (messageText === '/game') {
        // Yangi o'yin uchun ma'lumotlarni boshlang'ich holatga o'rnatish
        games[chatId] = {
            board: [
                ['⬜️', '⬜️', '⬜️'],
                ['⬜️', '⬜️', '⬜️'],
                ['⬜️', '⬜️', '⬜️']
            ],
            playerSymbol: null,
            botSymbol: null
        };

        await bot.sendMessage(chatId, "❌ yoki ⭕️ dan birini tanlang:", {
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: "❌", callback_data: 'choose_x' },
                        { text: "⭕️", callback_data: 'choose_o' }
                    ]
                ]
            }
        });
    }
});

// Callbackni boshqarish
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;

    // O'yin ma'lumotlarini olish
    const game = games[chatId];
    if (!game) {
        await bot.answerCallbackQuery(query.id, { text: "Avval /game buyrug'ini yuboring!" });
        return;
    }

    // Tanlov bosqichi
    if (query.data === 'choose_x' || query.data === 'choose_o') {
        game.playerSymbol = query.data === 'choose_x' ? '❌' : '⭕️';
        game.botSymbol = game.playerSymbol === '❌' ? '⭕️' : '❌';
        
        await bot.editMessageText(`Siz ${game.playerSymbol} ni tanladingiz!`, {
            chat_id: chatId,
            message_id: messageId
        });
        if(query.data === 'choose_o'){
            addRandom(game.board, game.botSymbol)
        }
        await renderBoard(chatId, game.board);
        return;
    }

    // O'yin davomida harakat
    const [row, col] = query.data.split('_').map(Number);
    if (game.board[row][col] === '⬜️') {
        game.board[row][col] = game.playerSymbol; 
        await renderBoard(chatId, game.board, messageId);
        
        if (!addRandom(game.board, game.botSymbol)) {
            bot.sendMessage(chatId, "O'yin tugadi! Bo'sh joy yo'q.");
            delete games[chatId]; // O'yin tugasa, o'chirib yuboriladi
            return;
        }
        if(game.board[0][0] == '❌' && game.board[0][1] == '❌' && game.board[0][2] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[1][0] == '❌' && game.board[1][1] == '❌' && game.board[1][2] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[2][0] == '❌' && game.board[2][1] == '❌' && game.board[2][2] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[1][0] == '❌' && game.board[1][1] == '❌' && game.board[1][2] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[0][2] == '❌' && game.board[1][1] == '❌' && game.board[2][0] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[0][0] == '❌' && game.board[1][1] == '❌' && game.board[2][2] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[0][0] == '❌' && game.board[1][0] == '❌' && game.board[2][0] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[0][1] == '❌' && game.board[1][1] == '❌' && game.board[2][1] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }
        if(game.board[0][2] == '❌' && game.board[1][2] == '❌' && game.board[2][2] == '❌'){
            await bot.sendMessage(chatId, "❌ g'alaba qozondi!")
            return
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if(game.board[0][0] == '⭕️' && game.board[0][1] == '⭕️' && game.board[0][2] == '⭕️'){
            await bot.sendMessage(chatId, "hello g'alaba qozondi!")
            return
        }
        if(game.board[1][0] == '⭕️' && game.board[1][1] == '⭕️' && game.board[1][2] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }
        if(game.board[2][0] == '⭕️' && game.board[2][1] == '⭕️' && game.board[2][2] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }
        if(game.board[1][0] == '⭕️' && game.board[1][1] == '⭕️' && game.board[2][2] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }
        if(game.board[0][2] == '⭕️' && game.board[1][1] == '⭕️' && game.board[2][1] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }
        if(game.board[0][0] == '⭕️' && game.board[1][0] == '⭕️' && game.board[2][0] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }
        if(game.board[0][1] == '⭕️' && game.board[1][1] == '⭕️' && game.board[2][1] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }
        if(game.board[0][2] == '⭕️' && game.board[1][2] == '⭕️' && game.board[2][2] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }
        if(game.board[0][2] == '⭕️' && game.board[1][1] == '⭕️' && game.board[2][0] == '⭕️'){
            await bot.sendMessage(chatId, "⭕️ g'alaba qozondi!")
            return
        }


        await renderBoard(chatId, game.board, messageId); // Bot harakatidan keyin taxtachani ko'rsatish
    } else {
        bot.answerCallbackQuery(query.id, { text: "Bu joy band!" });
    }

    bot.answerCallbackQuery(query.id);
});

// Random bo'sh joyga belgi qo'yadigan funksiya
function addRandom(matrix, str) {
    const emptyCells = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === '⬜️') {
                emptyCells.push([i, j]);
            }
        }
    }

    if (emptyCells.length === 0) {
        return false; // Bo'sh joy yo'q
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const [row, col] = emptyCells[randomIndex];
    matrix[row][col] = str;

    return true;
}
