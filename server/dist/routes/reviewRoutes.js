"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Dummy review data
const dummyReviews = [
    {
        user: 'John Doe',
        rating: 5,
        comment: 'Fantastic experience! Highly recommend.',
        date: new Date().toISOString(),
    },
    {
        user: 'Jane Smith',
        rating: 4,
        comment: 'Great event, but could be better organized.',
        date: new Date().toISOString(),
    },
    {
        user: 'Sam Wilson',
        rating: 3,
        comment: 'It was okay, not what I expected.',
        date: new Date().toISOString(),
    },
    {
        user: 'Emily Johnson',
        rating: 5,
        comment: 'Loved it! Will volunteer again.',
        date: new Date().toISOString(),
    },
];
router.get('/reviews', (req, res) => {
    res.json(dummyReviews);
});
exports.default = router;
