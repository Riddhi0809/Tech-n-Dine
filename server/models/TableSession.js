const mongoose = require('mongoose');

const tableSessionSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true, unique: true },
  guests: [
    {
      guestId: String,
      name: String,
      cart: [
        {
          itemId: mongoose.Schema.Types.ObjectId,
          name: String,
          price: Number,
          quantity: Number
        }
      ]
    }
  ],
  isSponsored: { type: Boolean, default: false },
  sponsoredBy: { type: String, default: null },
  orderStatus: { type: String, enum: ['Open', 'Preparing', 'Ready', 'Paid'], default: 'Open' }
}, { timestamps: true });

module.exports = mongoose.model('TableSession', tableSessionSchema);